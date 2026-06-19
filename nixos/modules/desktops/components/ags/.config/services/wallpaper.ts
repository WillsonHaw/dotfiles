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
const [currentWallpaper, setCurrentWallpaper] = createState<WallpaperInfo | null>(null)
const [nextWallpaper, setNextWallpaper] = createState<WallpaperInfo | null>(null)
const [isDownloading, setIsDownloading] = createState(false)
const [searchTotal, setSearchTotal] = createState<number | null>(null)
const [fetchStatus, setFetchStatus] = createState<"idle" | "ok" | "no-results" | "offline" | "api-error">("idle")
const [lastDebugUrl, setLastDebugUrl] = createState<string | null>(null)
const [lastDebugResponse, setLastDebugResponse] = createState<string | null>(null)

// --- Config ---
function saveConfig() {
  try {
    writeFile(CONFIG_FILE, JSON.stringify({
      tags: tags(), sfw: sfw(), sketchy: sketchy(), nsfw: nsfw(),
      general: general(), anime: anime(), people: people(),
      apikey: apikey(), localOnly: localOnly(), displayTimeMs: displayTime(),
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
  } catch {}
}

// --- Timer ---
let _timer: { cancel(): void } | null = null

function startTimer() {
  if (_timer) _timer.cancel()
  _timer = timeout(displayTime(), () => { random().catch(() => {}) })
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

function randomLocal(): WallpaperInfo | null {
  const all: WallpaperInfo[] = [
    ...(sfw() ? loadLocalFiles("sfw").map(path => ({ path, purity: "sfw" as const, id: null })) : []),
    ...(sketchy() ? loadLocalFiles("sketchy").map(path => ({ path, purity: "sketchy" as const, id: null })) : []),
    ...(nsfw() ? loadLocalFiles("nsfw").map(path => ({ path, purity: "nsfw" as const, id: null })) : []),
  ]
  if (all.length === 0) return null
  return all[Math.floor(Math.random() * all.length)]
}

// --- Wallhaven API (via curl) ---
function purityEnabled(p: string): boolean {
  return (p === "sfw" && sfw()) || (p === "sketchy" && sketchy()) || (p === "nsfw" && nsfw())
}

async function fetchWallhaven(): Promise<{ url: string; purity: string; id: string } | null> {
  const purity = `${sfw() ? "1" : "0"}${sketchy() ? "1" : "0"}${nsfw() ? "1" : "0"}`
  const categories = `${general() ? "1" : "0"}${anime() ? "1" : "0"}${people() ? "1" : "0"}`
  if (purity === "000" || categories === "000") return null

  let url = `${WALLHAVEN_API}?sorting=random&purity=${purity}&categories=${categories}`
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
    if (json.data.length === 0) { setFetchStatus("no-results"); return null }
    setFetchStatus("ok")
    const item = json.data[Math.floor(Math.random() * json.data.length)]
    return { url: item.path, purity: item.purity, id: String(item.id) }
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

// --- Apply & random ---
function applyWallpaper(info: WallpaperInfo) {
  setCurrentWallpaper(info)
  execAsync(["awww", "img", "--resize", "fit", "-t", "random", info.path]).catch(() => {})
  startTimer()
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

// --- Save ---
function saveCurrentWallpaper() {
  const cur = currentWallpaper()
  if (!cur) return
  const filename = cur.path.split("/").pop()
  if (!filename) return
  const dest = `${HOME}/Wallpapers/${cur.purity}`
  execAsync(["mkdir", "-p", dest])
    .then(() => execAsync(["cp", cur.path, `${dest}/${filename}`]))
    .catch(() => {})
}

// --- Settings with side effects ---
function onSettingsChange() {
  saveConfig()
  // Always discard stale prefetch and restart with new settings
  setNextWallpaper(null)
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
  startTimer()
  prefetchNext().catch(() => {})
})()

export default {
  tags, sfw, sketchy, nsfw, general, anime, people, apikey, localOnly, displayTime,
  currentWallpaper, nextWallpaper, isDownloading,
  searchTotal, fetchStatus,
  lastDebugUrl, lastDebugResponse,
  random, saveCurrentWallpaper,
  setTags, setSfw, setSketchy, setNsfw, setGeneral, setAnime, setPeople,
  setApikey, setLocalOnly, setDisplayTimeMinutes, getDisplayTimeMinutes,
}
