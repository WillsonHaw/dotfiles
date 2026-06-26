import { createState } from "ags"
import { exec, execAsync } from "ags/process"
import { readFile, writeFile } from "ags/file"
import { timeout } from "ags/time"
import GLib from "gi://GLib"

const HOME = GLib.get_home_dir()
const CONFIG_FILE = `${HOME}/Wallpapers/wallhaven.config.json`
const TMP_DIR = "/tmp/ags-wallpapers"
const IMAGE_RE = /\.(jpe?g|png|webp|gif|bmp|avif)$/i
const WALLHAVEN_API = "https://wallhaven.cc/api/v1/search"

try { exec(["mkdir", "-p", TMP_DIR]) } catch {}
try { exec(["mkdir", "-p", `${HOME}/Wallpapers`]) } catch {}

interface Tag {
  id: number
  name: string
  purity: string
}

interface WallpaperInfo {
  path: string
  purity: "sfw" | "sketchy" | "nsfw"
  id: string | null
}

// --- State ---
const [tags, _setTags] = createState("")
const [sfw, _setSfw] = createState(true)
const [sketchy, _setSketchy] = createState(false)
const [nsfw, _setNsfw] = createState(false)
const [general, _setGeneral] = createState(true)
const [anime, _setAnime] = createState(true)
const [people, _setPeople] = createState(true)
const [apikey, _setApikey] = createState("")
const [localOnly, _setLocalOnly] = createState(false)
const [displayTime, _setDisplayTime] = createState(5 * 60_000)
const [timerProgress, _setTimerProgress] = createState(0)
const [currentWallpaper, setCurrentWallpaper] = createState<WallpaperInfo | null>(null)
const [nextWallpaper, setNextWallpaper] = createState<WallpaperInfo | null>(null)
const [isDownloading, setIsDownloading] = createState(false)
const [searchTotal, setSearchTotal] = createState<number | null>(null)
const [fetchStatus, setFetchStatus] = createState<"idle" | "ok" | "no-results" | "offline" | "api-error">("idle")
const [lastDebugUrl, setLastDebugUrl] = createState<string | null>(null)
const [lastDebugResponse, setLastDebugResponse] = createState<string | null>(null)
const [currentImageTags, setCurrentImageTags] = createState<Tag[]>([])
const [currentIndex, setCurrentIndex] = createState<number | null>(null)
const [currentTotal, setCurrentTotal] = createState<number | null>(null)
const [coverMode, _setCoverMode] = createState(false)
const [blacklist, _setBlacklist] = createState<string[]>([])
const [isSaved, _setIsSaved] = createState(false)

// --- Config ---
function saveConfig() {
  try {
    writeFile(CONFIG_FILE, JSON.stringify({
      tags: tags(), sfw: sfw(), sketchy: sketchy(), nsfw: nsfw(),
      general: general(), anime: anime(), people: people(),
      apikey: apikey(), localOnly: localOnly(), displayTimeMs: displayTime(),
      coverMode: coverMode(), blacklist: blacklist(),
    }, null, 2))
  } catch {}
}

function loadConfig() {
  try {
    const c = JSON.parse(readFile(CONFIG_FILE))
    if (c.tags !== undefined) _setTags(c.tags)
    if (c.sfw !== undefined) _setSfw(c.sfw)
    if (c.sketchy !== undefined) _setSketchy(c.sketchy)
    if (c.nsfw !== undefined) _setNsfw(c.nsfw)
    if (c.general !== undefined) _setGeneral(c.general)
    if (c.anime !== undefined) _setAnime(c.anime)
    if (c.people !== undefined) _setPeople(c.people)
    if (c.apikey !== undefined) _setApikey(c.apikey)
    if (c.localOnly !== undefined) _setLocalOnly(c.localOnly)
    if (c.displayTimeMs !== undefined) _setDisplayTime(c.displayTimeMs)
    if (c.coverMode !== undefined) _setCoverMode(c.coverMode)
    if (c.blacklist !== undefined) _setBlacklist(c.blacklist)
  } catch {}
}

// --- Timer ---
let _timer: { cancel(): void } | null = null
let _timerStartMs = 0
let _progressSourceId: number | null = null
let _pausedElapsedMs = 0
const [timerPaused, _setTimerPaused] = createState(false)

function stopProgressTicks() {
  if (_progressSourceId !== null) {
    GLib.source_remove(_progressSourceId)
    _progressSourceId = null
  }
}

function startProgressTicks() {
  stopProgressTicks()
  _progressSourceId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
    const elapsed = GLib.get_monotonic_time() / 1000 - _timerStartMs
    _setTimerProgress(Math.min(1, elapsed / displayTime()))
    return true
  })
}

function startTimer() {
  if (_timer) _timer.cancel()
  _timerStartMs = GLib.get_monotonic_time() / 1000
  _pausedElapsedMs = 0
  _setTimerProgress(0)
  _setTimerPaused(false)
  startProgressTicks()
  _timer = timeout(displayTime(), () => { random().catch(() => {}) })
}

function toggleTimer() {
  if (timerPaused()) {
    // Resume: adjust start so elapsed picks up where it left off
    _timerStartMs = GLib.get_monotonic_time() / 1000 - _pausedElapsedMs
    startProgressTicks()
    _timer = timeout(Math.max(1, displayTime() - _pausedElapsedMs), () => { random().catch(() => {}) })
    _setTimerPaused(false)
  } else {
    _pausedElapsedMs = GLib.get_monotonic_time() / 1000 - _timerStartMs
    if (_timer) { _timer.cancel(); _timer = null }
    stopProgressTicks()
    _setTimerPaused(true)
  }
}

// --- Local folders ---
function loadLocalFiles(purity: "sfw" | "sketchy" | "nsfw"): string[] {
  try {
    return exec(["ls", "-A1", `${HOME}/Wallpapers/${purity}`])
      .split("\n")
      .filter(f => IMAGE_RE.test(f))
      .map(f => `${HOME}/Wallpapers/${purity}/${f}`)
  } catch { return [] }
}

// --- Viewed tracking ---
// Keyed by Wallhaven ID for remote images, path for local ones.
// Cleared when settings change (new search) or when the full set has been cycled through.
const _viewedIds = new Set<string>()
let _localTotal = 0

function randomLocal(): WallpaperInfo | null {
  const all: WallpaperInfo[] = [
    ...(sfw() ? loadLocalFiles("sfw").map(path => ({ path, purity: "sfw" as const, id: null })) : []),
    ...(sketchy() ? loadLocalFiles("sketchy").map(path => ({ path, purity: "sketchy" as const, id: null })) : []),
    ...(nsfw() ? loadLocalFiles("nsfw").map(path => ({ path, purity: "nsfw" as const, id: null })) : []),
  ]
  _localTotal = all.length
  if (all.length === 0) return null
  let pool = all.filter(w => !_viewedIds.has(w.path) && !blacklist().includes(w.path))
  if (pool.length === 0) { _viewedIds.clear(); pool = all }
  return pool[Math.floor(Math.random() * pool.length)]
}

// --- Wallhaven API (via curl) ---
function purityEnabled(p: string): boolean {
  return (p === "sfw" && sfw()) || (p === "sketchy" && sketchy()) || (p === "nsfw" && nsfw())
}

async function fetchTagsForId(id: string): Promise<Tag[]> {
  const key = apikey()
  let url = `https://wallhaven.cc/api/v1/w/${id}`
  if (key) url += `?apikey=${encodeURIComponent(key)}`
  try {
    const out = await execAsync(["curl", "-s", "--max-time", "10", url])
    const json = JSON.parse(out)
    return json?.data?.tags ?? []
  } catch { return [] }
}

// Pagination state — seed keeps the random ordering consistent across pages so
// we can walk through all results without repeats. Cleared on any settings change.
let _apiSeed = ""
let _apiPage = 1
let _apiQueue: Array<{ url: string; purity: string; id: string }> = []
let _apiConsumedCount = 0

function resetApiPagination() {
  _apiSeed = Math.random().toString(36).substring(2, 8)
  _apiPage = 1
  _apiQueue = []
  _apiConsumedCount = 0
}

async function fetchWallhaven(): Promise<{ url: string; purity: string; id: string } | null> {
  // Serve from queue if we have items left from the last page fetch.
  if (_apiQueue.length > 0) { _apiConsumedCount++; return _apiQueue.shift()! }

  const purity = `${sfw() ? "1" : "0"}${sketchy() ? "1" : "0"}${nsfw() ? "1" : "0"}`
  const categories = `${general() ? "1" : "0"}${anime() ? "1" : "0"}${people() ? "1" : "0"}`
  if (purity === "000" || categories === "000") return null

  if (!_apiSeed) resetApiPagination()

  let url = `${WALLHAVEN_API}?sorting=random&seed=${_apiSeed}&page=${_apiPage}&purity=${purity}&categories=${categories}`
  if (tags()) url += `&q=${encodeURIComponent(tags())}`
  if (apikey()) url += `&apikey=${encodeURIComponent(apikey())}`

  setLastDebugUrl(url)
  setLastDebugResponse(null)

  let out: string
  try {
    out = await execAsync(["curl", "-s", "--max-time", "15", url])
    setLastDebugResponse(out)
  } catch {
    setLastDebugResponse("(curl failed — network unreachable)")
    setFetchStatus("offline")
    return null
  }

  try {
    const json = JSON.parse(out)
    if (!Array.isArray(json?.data)) { setFetchStatus("api-error"); return null }
    setSearchTotal(json.meta?.total ?? null)
    if (json.data.length === 0) {
      // Exhausted all pages — start a fresh cycle with a new seed.
      resetApiPagination()
      setFetchStatus("no-results")
      return null
    }
    setFetchStatus("ok")
    _apiPage++
    _apiQueue = json.data
      .filter((item: any) => !blacklist().includes(String(item.id)))
      .map((item: any) => ({ url: item.path, purity: item.purity, id: String(item.id) }))
    _apiConsumedCount++
    return _apiQueue.shift()!
  } catch { setFetchStatus("api-error"); return null }
}

async function downloadFile(url: string, id: string): Promise<string | null> {
  const ext = url.split(".").pop()?.split("?")[0] ?? "jpg"
  const dest = `${TMP_DIR}/${id}.${ext}`
  try { exec(`test -f ${dest}`); return dest } catch {}
  try {
    await execAsync(["curl", "-sf", "-L", "--max-time", "30", "-o", dest, url])
    return dest
  } catch { return null }
}

// --- Prefetch ---
let _prefetching = false

async function prefetchNext(retries = 0): Promise<void> {
  if (_prefetching || localOnly() || retries > 3) return
  _prefetching = true
  try {
    const meta = await fetchWallhaven()
    if (!meta || !purityEnabled(meta.purity)) {
      _prefetching = false
      if (!localOnly() && (sfw() || sketchy() || nsfw())) prefetchNext(retries + 1).catch(() => {})
      return
    }
    const path = await downloadFile(meta.url, meta.id)
    if (path && purityEnabled(meta.purity)) {
      setNextWallpaper({ path, purity: meta.purity as "sfw" | "sketchy" | "nsfw", id: meta.id })
    } else if (path) {
      // purity changed while downloading — retry
      _prefetching = false
      prefetchNext(retries + 1).catch(() => {})
      return
    }
  } catch {}
  _prefetching = false
}

// Scale image down to fit the current screen (never upscale), pad remainder with black,
// then hand the exact-sized image to awww with --resize no.
// Screen dimensions are queried live so a display change is always reflected.
function fitAndApply(srcPath: string, transition: string) {
  if (coverMode()) {
    const awwwArgs: string[] = ["awww", "img", "--resize", "crop"]
    if (transition) awwwArgs.push("-t", transition)
    awwwArgs.push(srcPath)
    execAsync(awwwArgs).catch(() => {})
    return
  }
  let screenW = 0
  let screenH = 0
  try {
    const match = exec(["awww", "query"]).match(/:\s+(\d+)x(\d+),\s+scale:\s+([\d.]+)/)
    if (match) {
      const scale = parseFloat(match[3])
      screenW = Math.round(parseInt(match[1]) * scale)
      screenH = Math.round(parseInt(match[2]) * scale)
    }
  } catch {}

  const name = srcPath.split("/").pop()!
  const fitPath = `${TMP_DIR}/fit_${name}`

  if (screenW > 0 && screenH > 0) {
    const awwwArgs = transition
      ? ["awww", "img", "--resize", "no", "-t", transition, fitPath]
      : ["awww", "img", "--resize", "no", fitPath]
    execAsync([
      "magick", srcPath,
      "-resize", `${screenW}x${screenH}>`,
      "-gravity", "center",
      "-background", "black",
      "-extent", `${screenW}x${screenH}`,
      fitPath,
    ])
      .then(() => execAsync(awwwArgs).catch(() => {}))
      .catch(() => execAsync(["awww", "img", "--resize", "fit", "-t", "random", srcPath]).catch(() => {}))
  } else {
    execAsync(["awww", "img", "--resize", "fit", "-t", "random", srcPath]).catch(() => {})
  }
}

// --- Apply & random ---
function applyWallpaper(info: WallpaperInfo) {
  _panicActive = false
  setCurrentWallpaper(info)
  setCurrentImageTags([])
  if (!info.id) {
    _viewedIds.add(info.path)
    setCurrentIndex(_viewedIds.size)
    setCurrentTotal(_localTotal)
  } else {
    setCurrentIndex(_apiConsumedCount)
    setCurrentTotal(searchTotal())
  }
  fitAndApply(info.path, "random")
  checkIsSaved()
  startTimer()
  if (info.id) {
    fetchTagsForId(info.id).then(setCurrentImageTags).catch(() => {})
  }
}

let _busy = false

async function random(): Promise<void> {
  if (_busy) return
  _busy = true
  try {
    if (localOnly() || !(sfw() || sketchy() || nsfw())) {
      const w = randomLocal()
      if (w) applyWallpaper(w)
      return
    }
    const next = nextWallpaper()
    if (next) {
      setNextWallpaper(null)
      applyWallpaper(next)
      prefetchNext().catch(() => {})
      return
    }
    setIsDownloading(true)
    const meta = await fetchWallhaven().catch(() => null)
    if (meta) {
      const path = await downloadFile(meta.url, meta.id).catch(() => null)
      if (path) {
        applyWallpaper({ path, purity: meta.purity as "sfw" | "sketchy" | "nsfw", id: meta.id })
        prefetchNext().catch(() => {})
        return
      }
    }
    const local = randomLocal()
    if (local) applyWallpaper(local)
  } finally {
    _busy = false
    setIsDownloading(false)
  }
}

// --- Panic: immediately apply a random SFW local wallpaper, no transition, no state changes ---
// A second invocation while in panic mode restores the original wallpaper.
// panic() intentionally never calls applyWallpaper(), so currentWallpaper() always
// holds the pre-panic path and can be used for restoration.
let _panicActive = false

async function panicApply(srcPath: string): Promise<void> {
  let screenW = 0, screenH = 0
  try {
    const match = exec(["awww", "query"]).match(/:\s+(\d+)x(\d+),\s+scale:\s+([\d.]+)/)
    if (match) {
      const scale = parseFloat(match[3])
      screenW = Math.round(parseInt(match[1]) * scale)
      screenH = Math.round(parseInt(match[2]) * scale)
    }
  } catch {}
  const name = srcPath.split("/").pop()!
  const fitPath = `${TMP_DIR}/panic_${name}`
  if (screenW > 0 && screenH > 0) {
    try {
      await execAsync([
        "magick", srcPath,
        "-resize", `${screenW}x${screenH}>`,
        "-gravity", "center",
        "-background", "black",
        "-extent", `${screenW}x${screenH}`,
        fitPath,
      ])
      await execAsync(["awww", "img", "--resize", "no", "-t", "none", fitPath])
    } catch {
      execAsync(["awww", "img", "--resize", "fit", "-t", "none", srcPath]).catch(() => {})
    }
  } else {
    execAsync(["awww", "img", "--resize", "fit", "-t", "none", srcPath]).catch(() => {})
  }
}

async function panic(): Promise<void> {
  if (_panicActive) {
    // Restore: reuse the fit_ file that fitAndApply already created — no magick needed.
    _panicActive = false
    const prev = currentWallpaper()
    if (prev) {
      const name = prev.path.split("/").pop()!
      const fitPath = `${TMP_DIR}/fit_${name}`
      try {
        exec(["test", "-f", fitPath])
        execAsync(["awww", "img", "--resize", "no", "-t", "none", fitPath]).catch(() => {})
      } catch {
        // fit file missing — regenerate from source
        await panicApply(prev.path).catch(() => {})
      }
    }
    startTimer()
    return
  }

  const files = loadLocalFiles("sfw")
  if (_timer) { _timer.cancel(); _timer = null }
  stopProgressTicks()
  _setTimerProgress(0)
  if (files.length === 0) {
    // No SFW wallpapers — blank the screen with a black image
    _panicActive = true
    let screenW = 1920, screenH = 1080
    try {
      const match = exec(["awww", "query"]).match(/:\s+(\d+)x(\d+),\s+scale:\s+([\d.]+)/)
      if (match) {
        const scale = parseFloat(match[3])
        screenW = Math.round(parseInt(match[1]) * scale)
        screenH = Math.round(parseInt(match[2]) * scale)
      }
    } catch {}
    const blackPath = `${TMP_DIR}/panic_black.png`
    try {
      await execAsync(["magick", "-size", `${screenW}x${screenH}`, "xc:black", blackPath])
      await execAsync(["awww", "img", "--resize", "no", "-t", "none", blackPath])
    } catch {}
    return
  }

  _panicActive = true
  const srcPath = files[Math.floor(Math.random() * files.length)]
  await panicApply(srcPath).catch(() => {})
}

// --- Save / delete / blacklist ---
function checkIsSaved() {
  const cur = currentWallpaper()
  if (!cur) { _setIsSaved(false); return }
  const filename = cur.path.split("/").pop()
  if (!filename) { _setIsSaved(false); return }
  try { exec(["test", "-f", `${HOME}/Wallpapers/${cur.purity}/${filename}`]); _setIsSaved(true) }
  catch { _setIsSaved(false) }
}

function saveCurrentWallpaper() {
  const cur = currentWallpaper()
  if (!cur) return
  const filename = cur.path.split("/").pop()
  if (!filename) return
  const dest = `${HOME}/Wallpapers/${cur.purity}`
  execAsync(["mkdir", "-p", dest])
    .then(() => execAsync(["cp", cur.path, `${dest}/${filename}`]))
    .then(() => _setIsSaved(true))
    .catch(() => {})
}

function deleteCurrentWallpaper() {
  const cur = currentWallpaper()
  if (!cur) return
  const filename = cur.path.split("/").pop()
  if (!filename) return
  execAsync(["rm", "-f", `${HOME}/Wallpapers/${cur.purity}/${filename}`])
    .then(() => _setIsSaved(false))
    .catch(() => {})
}

function blacklistCurrent() {
  const cur = currentWallpaper()
  if (!cur) return
  const key = cur.id ?? cur.path
  if (!blacklist().includes(key)) {
    _setBlacklist([...blacklist(), key])
    saveConfig()
  }
  random().catch(() => {})
}

// --- Settings with side effects ---
function onSettingsChange() {
  saveConfig()
  _viewedIds.clear()
  resetApiPagination()
  setNextWallpaper(null)
  setCurrentIndex(null)
  setCurrentTotal(null)
  _prefetching = false
  if (!localOnly() && (sfw() || sketchy() || nsfw()) && (general() || anime() || people())) {
    prefetchNext().catch(() => {})
  }
}

function setTags(v: string) { if (v === tags()) return; _setTags(v); onSettingsChange() }
function setSfw(v: boolean) { if (v === sfw()) return; _setSfw(v); onSettingsChange() }
function setSketchy(v: boolean) { if (v === sketchy()) return; _setSketchy(v); onSettingsChange() }
function setNsfw(v: boolean) { if (v === nsfw()) return; _setNsfw(v); onSettingsChange() }
function setGeneral(v: boolean) { if (v === general()) return; _setGeneral(v); onSettingsChange() }
function setAnime(v: boolean) { if (v === anime()) return; _setAnime(v); onSettingsChange() }
function setPeople(v: boolean) { if (v === people()) return; _setPeople(v); onSettingsChange() }
function setApikey(v: string) { _setApikey(v); saveConfig() }
function setLocalOnly(v: boolean) { if (v === localOnly()) return; _setLocalOnly(v); onSettingsChange() }
function setCoverMode(v: boolean) {
  if (v === coverMode()) return
  _setCoverMode(v)
  saveConfig()
  const cur = currentWallpaper()
  if (cur) fitAndApply(cur.path, "")
}
function setDisplayTimeMinutes(min: number) {
  _setDisplayTime(Math.max(1, min) * 60_000)
  saveConfig()
  startTimer()
}
function getDisplayTimeMinutes(): number {
  return Math.round(displayTime() / 60_000)
}

;(function init() {
  loadConfig()
  // Re-apply the daemon's restored wallpaper with correct scaling on startup.
  try {
    const query = exec(["awww", "query"])
    const path = query.split(": ").pop()?.trim()
    if (path && path !== "") fitAndApply(path, "")
  } catch {}
  startTimer()
  prefetchNext().catch(() => {})
})()

function refit() {
  const cur = currentWallpaper()
  if (cur) fitAndApply(cur.path, "")
}

export default {
  tags, sfw, sketchy, nsfw, general, anime, people, apikey, localOnly, displayTime, timerProgress,
  coverMode, isSaved, timerPaused,
  currentWallpaper, nextWallpaper, isDownloading,
  searchTotal, fetchStatus,
  lastDebugUrl, lastDebugResponse,
  currentImageTags,
  currentIndex, currentTotal,
  random, panic, refit, toggleTimer,
  saveCurrentWallpaper, deleteCurrentWallpaper, blacklistCurrent,
  setTags, setSfw, setSketchy, setNsfw, setGeneral, setAnime, setPeople,
  setApikey, setLocalOnly, setDisplayTimeMinutes, getDisplayTimeMinutes, setCoverMode,
}
