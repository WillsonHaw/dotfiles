import { createState } from "ags"
import { exec } from "ags/process"
import { monitorFile } from "ags/file"
import { timeout } from "ags/time"
import GLib from "gi://GLib"

const HOME = GLib.get_home_dir()
const DEFAULT_DISPLAY_TIME = 1000 * 60 * 5

interface WallpaperFolder {
  path: string
  label: string
  enabled: boolean
  wallpapers: string[]
}

const FOLDER_DEFS = [
  { path: `${HOME}/Wallpapers/sfw`, label: "SFW", defaultEnabled: true },
  { path: `${HOME}/Wallpapers/sketchy`, label: "Sketchy", defaultEnabled: false },
  { path: `${HOME}/Wallpapers/nsfw`, label: "NSFW", defaultEnabled: false },
]

const IMAGE_RE = /\.(jpe?g|png|webp|gif|bmp|avif)$/i

const [folders, setFolders] = createState<WallpaperFolder[]>([])
const [currentWallpaper, setCurrentWallpaper] = createState<string | null>(null)
const [displayTime, setDisplayTime] = createState(DEFAULT_DISPLAY_TIME)

let _timer: { cancel(): void } | null = null

function loadFiles(folder: string): string[] {
  try {
    return exec(`ls -A1 "${folder}"`)
      .split("\n")
      .filter(f => IMAGE_RE.test(f))
      .map(f => `${folder}/${f}`)
  } catch {
    return []
  }
}

function startTimer() {
  if (_timer) _timer.cancel()
  _timer = timeout(displayTime(), () => random())
}

function random() {
  const enabled = folders().filter(f => f.enabled && f.wallpapers.length > 0)
  if (enabled.length === 0) return

  const folder = enabled[Math.floor(Math.random() * enabled.length)]
  const next = folder.wallpapers[Math.floor(Math.random() * folder.wallpapers.length)]

  if (next === currentWallpaper() && (enabled.length > 1 || folder.wallpapers.length > 1)) {
    random()
    return
  }

  setCurrentWallpaper(next)
  exec(`awww img --resize fit -t random "${next}"`)
  startTimer()
}

function enableFolder(path: string) {
  setFolders(prev => prev.map(f => f.path === path ? { ...f, enabled: true } : f))
}

function disableFolder(path: string) {
  setFolders(prev => prev.map(f => f.path === path ? { ...f, enabled: false } : f))
  if (currentWallpaper()?.startsWith(path)) random()
}

function setDisplayTimeMinutes(minutes: number) {
  setDisplayTime(Math.max(1, minutes) * 60 * 1000)
  startTimer()
}

function getDisplayTimeMinutes(): number {
  return Math.round(displayTime() / 60_000)
}

;(function init() {
  const initial: WallpaperFolder[] = FOLDER_DEFS.map(({ path, label, defaultEnabled }) => ({
    path,
    label,
    enabled: defaultEnabled,
    wallpapers: loadFiles(path),
  }))

  FOLDER_DEFS.forEach(({ path }) => {
    monitorFile(path, () => {
      setFolders(prev => prev.map(f =>
        f.path === path ? { ...f, wallpapers: loadFiles(path) } : f,
      ))
    })
  })

  setFolders(initial)

  try {
    const current = exec("awww query").split(": ").pop() ?? null
    setCurrentWallpaper(current)
  } catch {}

  startTimer()
})()

export default {
  folders,
  currentWallpaper,
  displayTime,
  random,
  enableFolder,
  disableFolder,
  setDisplayTimeMinutes,
  getDisplayTimeMinutes,
}
