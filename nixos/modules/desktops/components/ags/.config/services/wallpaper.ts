import { createState, createComputed } from "ags"
import { exec } from "ags/process"
import { monitorFile } from "ags/file"
import { timeout } from "ags/time"

const DEFAULT_TRANSITION_TIME = 1000 * 60 * 5

interface WallpaperFolder {
  path: string
  enabled: boolean
  wallpapers: string[]
}

const [folders, setFolders] = createState<WallpaperFolder[]>([])
const [currentWallpaper, setCurrentWallpaper] = createState<string | null>(null)

let _displayTime = DEFAULT_TRANSITION_TIME
let _timer: { cancel(): void } | null = null

function loadFiles(folder: string): string[] {
  const files = exec(`ls -A1 ${folder}`)
  return files.split("\n").filter(Boolean).map((file) => `${folder}/${file}`)
}

function startTimer() {
  if (_timer) _timer.cancel()
  _timer = timeout(_displayTime, () => random())
}

function random() {
  const enabled = folders().filter((f) => f.enabled)

  if (enabled.length === 0) return

  const folderIndex = Math.floor(enabled.length * Math.random())
  const wallpapers = enabled[folderIndex].wallpapers
  const fileIndex = Math.floor(wallpapers.length * Math.random())
  const next = wallpapers[fileIndex]

  if (next === currentWallpaper() && (enabled.length > 1 || wallpapers.length > 1)) {
    random()
  } else {
    setCurrentWallpaper(next)
    exec(`awww img --resize fit -t random ${next}`)
    startTimer()
  }
}

function enableFolder(folderPath: string) {
  setFolders((prev) =>
    prev.map((f) => (f.path === folderPath ? { ...f, enabled: true } : f)),
  )
}

function disableFolder(folderPath: string) {
  setFolders((prev) =>
    prev.map((f) => (f.path === folderPath ? { ...f, enabled: false } : f)),
  )
  if (currentWallpaper()?.startsWith(folderPath)) random()
}

function init(...wallpaperFolders: string[]) {
  const initial: WallpaperFolder[] = wallpaperFolders.map((path) => ({
    path,
    enabled: true,
    wallpapers: loadFiles(path),
  }))

  wallpaperFolders.forEach((folder) => {
    monitorFile(folder, () => {
      setFolders((prev) =>
        prev.map((f) =>
          f.path === folder ? { ...f, wallpapers: loadFiles(folder) } : f,
        ),
      )
    })
  })

  setFolders(initial)

  try {
    const current = exec("awww query").split(": ").pop() ?? null
    setCurrentWallpaper(current)
  } catch {}

  startTimer()
}

init("/home/slumpy/Wallpapers/sfw", "/home/slumpy/Wallpapers/nsfw")

export default {
  folders,
  currentWallpaper,
  random,
  enableFolder,
  disableFolder,
}
