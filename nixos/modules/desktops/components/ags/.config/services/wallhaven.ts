import { createState, createComputed } from "ags"
import { exec, execAsync } from "ags/process"
import { readFile, writeFile } from "ags/file"
import { fetch } from "ags/fetch"
import { timeout } from "ags/time"

const DEFAULT_TRANSITION_TIME = 1000 * 60 * 5
const ROOT_URL = "https://wallhaven.cc/api/v1"
const CONFIG_FILE = "/home/slumpy/.wallhaven.config"
const WALLPAPER_FOLDER = "/tmp/wallhaven-downloads"

interface Wallpaper {
  id: string
  url: string
  short_url: string
  path: string
  purity: string
  colors: string[]
}

interface Tag {
  id: number
  name: string
  alias: string
  category_id: number
  category: string
  purity: string
  created_at: string
}

interface Meta {
  current_page: number
  last_page: number
  per_page: number
  total: number
  query: string | { id: number; tag: string } | null
  seed: string | null
}

// --- State ---
const [category, setCategory] = createState("111")
const [purity, setPurity] = createState("111")
const [apikey, setApikey] = createState("")
const [collection, setCollection] = createState("")
const [username, setUsername] = createState("")
const [searchTerm, setSearchTerm] = createState("")
const [displayTime, setDisplayTime] = createState(DEFAULT_TRANSITION_TIME)
const [useImageFill, setUseImageFill] = createState(false)
const [useClearColor, setUseClearColor] = createState(false)
const [useExactResolution, setUseExactResolution] = createState(false)
const [currentWallpaper, setCurrentWallpaper] = createState<[string, Wallpaper] | null>(null)
const [wallpaperTags, setWallpaperTags] = createState<Tag[]>([])
const [meta, setMeta] = createState<Meta | null>(null)
const [remaining, setRemaining] = createState(0)

let wallpapers: Wallpaper[] = []
let timer: { cancel(): void } | null = null

// --- Computed ---
const general = createComputed(() => category()[0] === "1")
const anime = createComputed(() => category()[1] === "1")
const people = createComputed(() => category()[2] === "1")
const sfw = createComputed(() => purity()[0] === "1")
const sketchy = createComputed(() => purity()[1] === "1")
const nsfw = createComputed(() => purity()[2] === "1")
const path = createComputed(() => currentWallpaper()?.[0] ?? "-")
const json = createComputed(() => currentWallpaper()?.[1] ?? null)
const metaStr = createComputed(() => {
  const m = meta()
  return m ? JSON.stringify(m, null, 2) : "Missing Metadata"
})
const displayTimeMinutes = createComputed(() => displayTime() / 60000)

// --- Helpers ---
function setCategoryBit(index: number, value: boolean) {
  setCategory((prev) => {
    const parts = prev.split("")
    parts[index] = value ? "1" : "0"
    return parts.join("")
  })
  resetAndSave()
}

function setPurityBit(index: number, value: boolean) {
  setPurity((prev) => {
    const parts = prev.split("")
    parts[index] = value ? "1" : "0"
    return parts.join("")
  })
  resetAndSave()
}

function resetAndSave() {
  wallpapers = []
  setMeta(null)
  setWallpaperTags([])
  setRemaining(0)
  saveFile()
}

function startTimer() {
  if (timer) timer.cancel()
  timer = timeout(displayTime(), () => random())
}

function getMonitorResolution(): { width: number; height: number } | null {
  try {
    const output = exec("niri msg -j outputs 2>/dev/null")
    const outputs: Record<string, any> = JSON.parse(output)
    const first = Object.values(outputs).find((o: any) => o.logical !== null)
    if (first?.logical) return { width: first.logical.width, height: first.logical.height }
  } catch {}
  try {
    const output = exec("hyprctl monitors -j 2>/dev/null")
    const monitors = JSON.parse(output)
    const focused = monitors.find((m: any) => m.focused)
    if (focused) return { width: focused.width, height: focused.height }
  } catch {}
  return null
}

function getUrl(): string {
  const cat = category()
  const pur = purity()
  const key = apikey()
  const col = collection()
  const user = username()
  const search = searchTerm()
  const exactRes = useExactResolution()
  const m = meta()

  const useCollection = !!(col && user)
  const urlPath = useCollection ? "/collections" : "/search"
  const params: Record<string, string> = {}

  if (key) params.apikey = key

  if (!useCollection) {
    let seed: string
    if (m && m.seed && m.current_page < m.last_page) {
      seed = m.seed
      params.page = (m.current_page + 1).toString()
    } else {
      seed = Math.random().toString(36).slice(2, 8)
    }

    params.categories = cat
    params.purity = pur
    params.sorting = "random"
    params.seed = seed

    const monitor = getMonitorResolution()
    if (exactRes && monitor) {
      params.resolutions = `${monitor.width}x${monitor.height}`
    } else if (monitor) {
      params.atleast = `1920x${monitor.height}`
    } else {
      params.ratios = "16x9,16x10,32x9,4x1,64x27,256x135"
    }

    if (search) params.q = search
  }

  return `${ROOT_URL}${urlPath}?${Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join("&")}`
}

async function getTags(id: string): Promise<Tag[]> {
  if (!apikey()) return []

  try {
    const url = `${ROOT_URL}/w/${id}?apikey=${apikey()}`
    const response = await fetch(url)
    const detail = await response.json()
    return detail.data.tags
  } catch {
    return []
  }
}

async function fetchWallpapers() {
  try {
    const url = getUrl()
    print("[Wallpaper] Request:", url)
    const response = await fetch(url)
    const searchResult = await response.json()
    wallpapers = searchResult.data
    setMeta(searchResult.meta)
    setRemaining(wallpapers.length)
  } catch (err) {
    console.error(err)
  }
}

// --- Actions ---
async function random() {
  try {
    if (wallpapers.length === 0) {
      await fetchWallpapers()
    }

    print(`[Wallpaper] ${wallpapers.length} wallpapers remaining in queue`)

    const wallpaper = wallpapers.shift()
    setRemaining(wallpapers.length)

    if (!wallpaper) {
      console.error("[Wallpaper] Could not fetch wallpapers")
      return
    }

    const fileName = `${WALLPAPER_FOLDER}/${wallpaper.path.split("/").pop()}`

    print(`[Wallpaper] Downloading wallpaper: ${wallpaper.path} to ${fileName}...`)
    await execAsync(`curl -o ${fileName} ${wallpaper.path}`)

    print(`[Wallpaper] Switching wallpaper to: ${wallpaper.id}`)

    let command = `awww img --resize ${useImageFill() ? "crop" : "fit"} -t random ${fileName}`

    if (useClearColor()) {
      const fill = wallpaper.colors[0]?.replace("#", "") ?? "000000"
      command += ` --fill-color ${fill}`
    }

    print(`[Wallpaper] awww command: ${command}`)
    exec(command)

    setCurrentWallpaper([fileName, wallpaper])

    const tags = await getTags(wallpaper.id)
    setWallpaperTags(tags)

    print(`[Wallpaper] ID: ${wallpaper.id}`)
    print(`[Wallpaper] Tags: ${tags.map((t) => t.name).join(", ")}`)
  } catch (err) {
    console.error(err)
  }

  saveFile()
  startTimer()
}

function saveCurrentWallpaper() {
  const current = currentWallpaper()
  if (!current) return

  const wp = current[1]
  const saveTo = `/home/slumpy/Wallpapers/${wp.purity}`

  print(`[Wallpaper] Saving current wallpaper to: ${saveTo}/${wp.path.split("/").pop()}`)
  exec(`cp ${current[0]} ${saveTo}`)
}

function saveFile() {
  try {
    const data = {
      category: category(),
      purity: purity(),
      useClearColor: useClearColor(),
      useExactResolution: useExactResolution(),
      apikey: apikey(),
      collection: collection(),
      username: username(),
      searchTerm: searchTerm(),
      displayTime: displayTime(),
      currentWallpaper: currentWallpaper(),
      tags: wallpaperTags(),
      meta: meta(),
    }
    writeFile(CONFIG_FILE, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error("[Wallpaper] Error saving config:", err)
  }
}

function loadFile() {
  try {
    const contents = readFile(CONFIG_FILE)
    if (!contents || contents.length === 0) {
      saveFile()
      return
    }

    const data = JSON.parse(contents)
    setCategory(data.category ?? "111")
    setPurity(data.purity ?? "111")
    setUseClearColor(data.useClearColor ?? false)
    setUseExactResolution(data.useExactResolution ?? false)
    setApikey(data.apikey ?? "")
    setCollection(data.collection ?? "")
    setUsername(data.username ?? "")
    setSearchTerm(data.searchTerm ?? "")
    setDisplayTime(data.displayTime ?? DEFAULT_TRANSITION_TIME)
    if (data.currentWallpaper) setCurrentWallpaper(data.currentWallpaper)
    if (data.tags) setWallpaperTags(data.tags)
    if (data.meta) setMeta(data.meta)
  } catch (err) {
    console.error("[Wallpaper] Error loading config:", err)
  }
}

// --- Init ---
exec(`mkdir -p ${WALLPAPER_FOLDER}`)
;["sfw", "sketchy", "nsfw"].forEach((p) => {
  exec(`mkdir -p /home/slumpy/Wallpapers/${p}`)
})

loadFile()
startTimer()

// --- Export ---
export default {
  // Accessors
  general,
  anime,
  people,
  sfw,
  sketchy,
  nsfw,
  useImageFill,
  useClearColor,
  useExactResolution,
  collection,
  username,
  searchTerm: searchTerm,
  apikey,
  displayTime: displayTimeMinutes,
  path,
  remaining,
  json,
  tags: wallpaperTags,
  meta: metaStr,

  // Setters
  setGeneral: (v: boolean) => setCategoryBit(0, v),
  setAnime: (v: boolean) => setCategoryBit(1, v),
  setPeople: (v: boolean) => setCategoryBit(2, v),
  setSfw: (v: boolean) => setPurityBit(0, v),
  setSketchy: (v: boolean) => setPurityBit(1, v),
  setNsfw: (v: boolean) => setPurityBit(2, v),
  setUseImageFill: (v: boolean) => { setUseImageFill(v); resetAndSave() },
  setUseClearColor: (v: boolean) => { setUseClearColor(v); resetAndSave() },
  setUseExactResolution: (v: boolean) => { setUseExactResolution(v); resetAndSave() },
  setCollection: (v: string) => { setCollection(v); resetAndSave() },
  setUsername: (v: string) => { setUsername(v); resetAndSave() },
  setSearchTerm: (v: string) => { setSearchTerm(v); resetAndSave() },
  setApikey: (v: string) => { setApikey(v); resetAndSave() },
  setDisplayTime: (minutes: number) => { setDisplayTime(minutes * 60000); resetAndSave() },

  // Actions
  random,
  save: saveFile,
  saveCurrentWallpaper,
}
