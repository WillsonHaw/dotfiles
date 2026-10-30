--!nonstrict
local API_BASE = "https://wallhaven.cc/api/v1"
local TMP_DIR = "/tmp/noctalia-wallpapers"
local PURITIES = { "sfw", "sketchy", "nsfw" }
local IMAGE_EXTENSIONS = { jpg = true, jpeg = true, png = true, webp = true, gif = true, bmp = true, avif = true }
local SEED_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789"
local DEBUG_RESPONSE_LIMIT = 65536
local MIN_ROTATION_MS = 5000
local TRANSITION_RESTORE_DELAY_MS = 1500
local DEFAULT_TRANSITION_DURATION = 1500
local DEFAULT_PROFILE = {
  name = "Profile",
  tags = "",
  sfw = true,
  sketchy = false,
  nsfw = false,
  general = true,
  anime = true,
  people = true,
  localOnly = false,
  displayTimeMs = 300000,
  coverMode = false,
}

local dataPath = (noctalia.pluginDataDir() or TMP_DIR) .. "/settings.json"
local data
local apiKey = ""
local wallpaperBase = ""

local currentWallpaper = nil
local currentImageTags = {}
local isDownloading = false
local fetchStatus = "idle"
local isSaved = false
local currentIndex = 0
local currentTotal = 0
local debugUrl = ""
local debugResponse = ""

local apiQueue = {}
local apiPage = 1
local apiSeed = ""
local apiConsumedCount = 0
local viewedPaths = {}
local localTotal = 0
local busy = false

local timerRunning = false
local timerPaused = false
local timerStartMs = 0
local pausedElapsedMs = 0
local timerProgress = 0

local panicActive = false
local prePanicWallpaper = nil
local savedTransitionDuration = nil
local restoreTransitionAtMs = nil
local pendingFillMode = nil

math.randomseed(math.floor(noctalia.nowMs() % 2147483647))

local function loadData()
  local raw = noctalia.readFile(dataPath)

  if raw == nil then
    raw = noctalia.readFile("defaults.json")
  end

  local decoded = if raw ~= nil then noctalia.json.decode(raw) else nil

  if type(decoded) ~= "table" then
    decoded = {}
  end

  if type(decoded.blacklist) ~= "table" then
    decoded.blacklist = {}
  end

  if type(decoded.profiles) ~= "table" or #decoded.profiles == 0 then
    decoded.profiles = { table.clone(DEFAULT_PROFILE) }
  end

  decoded.activeProfile = math.clamp(tonumber(decoded.activeProfile) or 1, 1, #decoded.profiles)

  return decoded
end

local function saveData()
  local encoded = noctalia.json.encode(data, true)

  if encoded == nil then
    return
  end

  local ok, err = noctalia.writeFile(dataPath, encoded)

  if not ok then
    noctalia.log(`failed to save {dataPath}: {err}`)
  end
end

local function activeProfile()
  return data.profiles[data.activeProfile] or {}
end

local function profileValue(key)
  local value = activeProfile()[key]

  if value == nil then
    return DEFAULT_PROFILE[key]
  end

  return value
end

local function displayTimeMs()
  return tonumber(profileValue("displayTimeMs")) or DEFAULT_PROFILE.displayTimeMs
end

local function isBlacklisted(key)
  return table.find(data.blacklist, key) ~= nil
end

local function fileName(path)
  return string.match(path, "[^/]+$") or ""
end

local function flag(value)
  return if value then "1" else "0"
end

local function loadConfig()
  local keyFile = noctalia.getConfig("api_key_file")

  apiKey = ""

  if type(keyFile) == "string" and keyFile ~= "" then
    local contents = noctalia.readFile(keyFile)

    if contents ~= nil then
      apiKey = noctalia.string.trim(contents)
    end
  end

  wallpaperBase = noctalia.expandPath(noctalia.getConfig("wallpaper_dir") or "~/Wallpapers")
  noctalia.mkdirAll(TMP_DIR)

  for _, purity in ipairs(PURITIES) do
    noctalia.mkdirAll(`{wallpaperBase}/{purity}`)
  end
end

local function publish()
  local profileNames = {}

  for index, profile in ipairs(data.profiles) do
    profileNames[index] = profile.name or `Profile {index}`
  end

  noctalia.state.set("status", {
    profiles = profileNames,
    activeProfile = data.activeProfile,
    settings = {
      tags = profileValue("tags"),
      sfw = profileValue("sfw"),
      sketchy = profileValue("sketchy"),
      nsfw = profileValue("nsfw"),
      general = profileValue("general"),
      anime = profileValue("anime"),
      people = profileValue("people"),
      localOnly = profileValue("localOnly"),
      coverMode = profileValue("coverMode"),
    },
    displayMinutes = math.round(displayTimeMs() / 60000),
    current = currentWallpaper,
    imageTags = currentImageTags,
    isDownloading = isDownloading,
    timerProgress = timerProgress,
    timerPaused = timerPaused,
    fetchStatus = fetchStatus,
    isSaved = isSaved,
    currentIndex = currentIndex,
    currentTotal = currentTotal,
    panicActive = panicActive,
  })
end

local function publishDebug()
  noctalia.state.set("debug", { url = debugUrl, response = debugResponse })
end

local function setShellConfig(path, tomlValue, onDone)
  local started = noctalia.runAsync({ "noctalia", "msg", "config-set", path, tomlValue }, function(result)
    if result.exitCode ~= 0 then
      noctalia.log(`config-set {path} failed: {result.stderr}`)
    end

    if onDone ~= nil then
      onDone()
    end
  end)

  if not started and onDone ~= nil then
    onDone()
  end
end

local function ensureFillMode()
  local mode = if profileValue("coverMode") then "crop" else "fit"

  if pendingFillMode == mode or noctalia.getSetting("wallpaper.fill_mode") == mode then
    return
  end

  pendingFillMode = mode

  setShellConfig("wallpaper.fill_mode", `"{mode}"`, function()
    pendingFillMode = nil
  end)
end

local function startTimer()
  timerStartMs = noctalia.nowMs()
  pausedElapsedMs = 0
  timerProgress = 0
  timerPaused = false
  timerRunning = true
end

local function toggleTimer()
  if timerPaused then
    timerStartMs = noctalia.nowMs() - pausedElapsedMs
    timerPaused = false
    timerRunning = true
  else
    pausedElapsedMs = noctalia.nowMs() - timerStartMs
    timerPaused = true
    timerRunning = false
  end

  publish()
end

local function listLocalFiles(purity)
  local dir = `{wallpaperBase}/{purity}`
  local names = noctalia.listDir(dir)
  local files = {}

  if names == nil then
    return files
  end

  for _, name in ipairs(names) do
    local ext = string.match(name, "%.(%w+)$")

    if ext ~= nil and IMAGE_EXTENSIONS[string.lower(ext)] then
      local path = `{dir}/{name}`
      local info = noctalia.fileInfo(path)

      if info ~= nil and not info.isDir then
        table.insert(files, path)
      end
    end
  end

  return files
end

local function randomLocal()
  local all = {}

  for _, purity in ipairs(PURITIES) do
    if profileValue(purity) then
      for _, path in ipairs(listLocalFiles(purity)) do
        table.insert(all, { path = path, purity = purity })
      end
    end
  end

  localTotal = #all

  if #all == 0 then
    return nil
  end

  local pool = {}

  for _, wallpaper in ipairs(all) do
    if table.find(viewedPaths, wallpaper.path) == nil and not isBlacklisted(wallpaper.path) then
      table.insert(pool, wallpaper)
    end
  end

  if #pool == 0 then
    viewedPaths = {}
    pool = all
  end

  return pool[math.random(1, #pool)]
end

local function resetApiPagination()
  local seed = ""

  for _ = 1, 6 do
    local index = math.random(1, #SEED_CHARS)

    seed ..= string.sub(SEED_CHARS, index, index)
  end

  apiSeed = seed
  apiPage = 1
  apiQueue = {}
  apiConsumedCount = 0
end

local function resetSearch()
  viewedPaths = {}
  apiQueue = {}
  apiPage = 1
  apiSeed = ""
  apiConsumedCount = 0
  currentIndex = 0
  currentTotal = 0
  fetchStatus = "idle"
end

local function apiHeaders()
  local headers = { "Accept: application/json" }

  if apiKey ~= "" then
    table.insert(headers, "X-API-Key: " .. apiKey)
  end

  return headers
end

local function fetchWallhaven(cb)
  if #apiQueue > 0 then
    apiConsumedCount += 1
    cb(table.remove(apiQueue, 1))

    return
  end

  local purity = flag(profileValue("sfw")) .. flag(profileValue("sketchy")) .. flag(profileValue("nsfw"))
  local categories = flag(profileValue("general")) .. flag(profileValue("anime")) .. flag(profileValue("people"))

  if purity == "000" or categories == "000" then
    cb(nil)

    return
  end

  if apiSeed == "" then
    resetApiPagination()
  end

  local url = `{API_BASE}/search?sorting=random&seed={apiSeed}&page={apiPage}&purity={purity}&categories={categories}`
  local tags = profileValue("tags")

  if tags ~= "" then
    url ..= "&q=" .. noctalia.string.urlEncode(tags)
  end

  debugUrl = url
  debugResponse = ""
  publishDebug()

  local started = noctalia.http({ url = url, headers = apiHeaders() }, function(res)
    debugResponse = string.sub(res.body or "", 1, DEBUG_RESPONSE_LIMIT)
    publishDebug()

    if not res.ok and (res.status or 0) == 0 then
      fetchStatus = "offline"
      cb(nil)

      return
    end

    local json = noctalia.json.decode(res.body or "")

    if type(json) ~= "table" or type(json.data) ~= "table" then
      fetchStatus = "api-error"
      cb(nil)

      return
    end

    currentTotal = if type(json.meta) == "table" then tonumber(json.meta.total) or 0 else 0

    if #json.data == 0 then
      resetApiPagination()
      fetchStatus = "no-results"
      cb(nil)

      return
    end

    fetchStatus = "ok"
    apiPage += 1
    apiQueue = {}

    for _, item in ipairs(json.data) do
      local id = tostring(item.id)

      if not isBlacklisted(id) then
        table.insert(apiQueue, { url = item.path, purity = item.purity, id = id })
      end
    end

    apiConsumedCount += 1
    cb(table.remove(apiQueue, 1))
  end)

  if not started then
    fetchStatus = "offline"
    cb(nil)
  end
end

local function downloadFile(url, id, cb)
  local cleanUrl = (string.gsub(url, "%?.*$", ""))
  local ext = string.match(cleanUrl, "%.(%w+)$") or "jpg"
  local dest = `{TMP_DIR}/{id}.{ext}`

  if noctalia.fileExists(dest) then
    cb(dest)

    return
  end

  local started = noctalia.download(url, dest, function(ok)
    cb(if ok then dest else nil)
  end)

  if not started then
    cb(nil)
  end
end

local function fetchTags(id)
  noctalia.http({ url = `{API_BASE}/w/{id}`, headers = apiHeaders() }, function(res)
    if currentWallpaper == nil or currentWallpaper.id ~= id then
      return
    end

    local json = noctalia.json.decode(res.body or "")

    if type(json) ~= "table" or type(json.data) ~= "table" or type(json.data.tags) ~= "table" then
      return
    end

    local tags = {}

    for _, tag in ipairs(json.data.tags) do
      table.insert(tags, { id = tostring(tag.id), name = tag.name or "", purity = tag.purity or "sfw" })
    end

    currentImageTags = tags
    publish()
  end)
end

local function checkIsSaved()
  if currentWallpaper == nil then
    isSaved = false

    return
  end

  local name = fileName(currentWallpaper.path)

  isSaved = name ~= "" and noctalia.fileExists(`{wallpaperBase}/{currentWallpaper.purity}/{name}`)
end

local function applyWallpaper(info)
  currentWallpaper = info
  currentImageTags = {}
  isDownloading = false

  if info.id ~= nil then
    currentIndex = apiConsumedCount
  else
    table.insert(viewedPaths, info.path)
    currentIndex = #viewedPaths
    currentTotal = localTotal
  end

  ensureFillMode()
  noctalia.setWallpaper(info.path)
  checkIsSaved()
  startTimer()
  publish()

  if info.id ~= nil then
    fetchTags(info.id)
  end
end

local function random()
  if busy then
    return
  end

  busy = true

  local function done(info)
    busy = false
    isDownloading = false

    if info ~= nil then
      applyWallpaper(info)

      return
    end

    startTimer()
    publish()
  end

  if profileValue("localOnly") or not (profileValue("sfw") or profileValue("sketchy") or profileValue("nsfw")) then
    done(randomLocal())

    return
  end

  isDownloading = true
  publish()

  fetchWallhaven(function(meta)
    if meta == nil then
      done(randomLocal())

      return
    end

    downloadFile(meta.url, meta.id, function(path)
      if path == nil then
        done(nil)

        return
      end

      done({ path = path, purity = meta.purity, id = meta.id })
    end)
  end)
end

local function panic()
  if panicActive then
    if prePanicWallpaper ~= nil then
      noctalia.setWallpaper(prePanicWallpaper.path)
      currentWallpaper = prePanicWallpaper
    end

    prePanicWallpaper = nil
    panicActive = false
    restoreTransitionAtMs = noctalia.nowMs() + TRANSITION_RESTORE_DELAY_MS
    checkIsSaved()
    startTimer()
    publish()

    return
  end

  prePanicWallpaper = currentWallpaper
  panicActive = true
  timerRunning = false
  restoreTransitionAtMs = nil

  if savedTransitionDuration == nil then
    savedTransitionDuration = noctalia.getSetting("wallpaper.transition_duration") or DEFAULT_TRANSITION_DURATION
  end

  publish()

  setShellConfig("wallpaper.transition_duration", "0", function()
    local pool = {}
    local files = listLocalFiles("sfw")

    for _, path in ipairs(files) do
      if not isBlacklisted(path) then
        table.insert(pool, path)
      end
    end

    if #pool == 0 then
      pool = files
    end

    if #pool > 0 then
      noctalia.setWallpaper(pool[math.random(1, #pool)])
    end
  end)
end

local function restoreTransition()
  local duration = savedTransitionDuration

  restoreTransitionAtMs = nil
  savedTransitionDuration = nil

  if duration ~= nil then
    setShellConfig("wallpaper.transition_duration", tostring(duration))
  end
end

local function switchProfile(index)
  if index == nil or index < 1 or index > #data.profiles or index == data.activeProfile then
    return
  end

  data.activeProfile = index
  saveData()
  resetSearch()
  random()
  publish()
end

local function setProfileValue(key, value, search)
  if DEFAULT_PROFILE[key] == nil or key == "name" or type(value) ~= type(DEFAULT_PROFILE[key]) then
    return
  end

  local profile = data.profiles[data.activeProfile]

  profile[key] = value
  saveData()

  if key == "coverMode" then
    ensureFillMode()
  end

  resetSearch()

  if search then
    random()
  end

  publish()
end

local function setDisplayMinutes(minutes)
  local profile = data.profiles[data.activeProfile]

  profile.displayTimeMs = math.max(1, math.floor(tonumber(minutes) or 1)) * 60000
  saveData()
  startTimer()
  publish()
end

local function saveCurrent()
  local current = currentWallpaper

  if current == nil then
    return
  end

  local name = fileName(current.path)
  local destDir = `{wallpaperBase}/{current.purity}`

  if name == "" then
    return
  end

  noctalia.mkdirAll(destDir)

  noctalia.runAsync({ "cp", current.path, `{destDir}/{name}` }, function(result)
    if result.exitCode == 0 and currentWallpaper == current then
      isSaved = true
      publish()
    end
  end)
end

local function deleteCurrent()
  local current = currentWallpaper

  if current == nil then
    return
  end

  local name = fileName(current.path)

  if name == "" then
    return
  end

  local ok = noctalia.removeFile(`{wallpaperBase}/{current.purity}/{name}`)

  if ok then
    isSaved = false
    publish()
  end
end

local function blacklistCurrent()
  local current = currentWallpaper

  if current == nil then
    return
  end

  local key = current.id or current.path

  if not isBlacklisted(key) then
    table.insert(data.blacklist, key)
    saveData()
  end

  random()
end

local function handle(action, value)
  if action == "next" then
    random()
  elseif action == "panic" then
    panic()
  elseif action == "setProfile" then
    switchProfile(tonumber(value))
  elseif action == "toggleTimer" then
    toggleTimer()
  elseif action == "setValue" and type(value) == "table" then
    setProfileValue(value.key, value.value, value.search == true)
  elseif action == "setDisplayMinutes" then
    setDisplayMinutes(value)
  elseif action == "save" then
    saveCurrent()
  elseif action == "delete" then
    deleteCurrent()
  elseif action == "block" then
    blacklistCurrent()
  end
end

function onIpc(event, payload)
  handle(event, payload)
end

function onConfigChanged()
  loadConfig()
  checkIsSaved()
  publish()
end

function update()
  local now = noctalia.nowMs()

  if restoreTransitionAtMs ~= nil and now >= restoreTransitionAtMs then
    restoreTransition()
  end

  if not timerRunning then
    return
  end

  local elapsed = now - timerStartMs
  local duration = math.max(MIN_ROTATION_MS, displayTimeMs())

  timerProgress = math.min(1, elapsed / duration)

  if elapsed >= duration then
    timerRunning = false
    random()
  end

  publish()
end

noctalia.state.watch("request", function(request)
  if type(request) == "table" then
    handle(request.action, request.value)
  end
end)

data = loadData()
loadConfig()
noctalia.setUpdateInterval(1000)

local previous = noctalia.state.get("status")

if type(previous) == "table" and type(previous.current) == "table" then
  currentWallpaper = previous.current
  checkIsSaved()
  startTimer()
  publish()
else
  publish()
  random()
end
