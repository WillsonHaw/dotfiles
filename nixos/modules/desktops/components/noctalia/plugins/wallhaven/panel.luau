--!nonstrict
local request = require("./lib/request.luau")

local TAGS_DEBOUNCE_MS = 2000
local DEBUG_PREVIEW_LIMIT = 4000
local CHIP_ROW_WIDTH = 380
local CHIP_CHAR_WIDTH = 7
local CHIP_PADDING = 22
local CHIP_GAP = 4

local status = noctalia.state.get("status") or {}
local debug = noctalia.state.get("debug") or {}
local isOpen = false
local debugExpanded = false
local tagsInputRev = 0
local tagsInputText = nil
local tagsDeadlineMs = nil

local function settings()
  return status.settings or {}
end

local function setValue(key, value, search)
  request("setValue", { key = key, value = value, search = search == true })
end

local function commitTags(search)
  local text = tagsInputText or ""

  tagsDeadlineMs = nil

  if search or text ~= (settings().tags or "") then
    setValue("tags", text, search)
  end
end

local function sectionTitle(text)
  return ui.label({ text = text, fontSize = 15, fontWeight = "bold", color = "on_surface_variant" })
end

local function section(children)
  return ui.column({ gap = 8, paddingH = 16, paddingV = 12 }, children)
end

local function segmented(items)
  local buttons = {}

  for _, item in ipairs(items) do
    table.insert(buttons, ui.button({
      key = item.key,
      text = item.label,
      variant = if item.checked then "primary" else "outline",
      controlSize = "sm",
      flexGrow = 1,
      onClick = item.onClick,
    }))
  end

  return ui.row({ gap = 4, flexGrow = 1 }, buttons)
end

local function toggleItem(key, label)
  return {
    key = key,
    label = label,
    checked = settings()[key] == true,
    onClick = function()
      setValue(key, not (settings()[key] == true), true)
    end,
  }
end

local function fetchStatusLine()
  local fetchStatus = status.fetchStatus or "idle"
  local text = ""
  local color = "on_surface_variant"

  if fetchStatus == "ok" then
    text = `{status.currentTotal or 0} wallpapers found`
    color = "primary"
  elseif fetchStatus == "no-results" then
    text = "No results for this search"
    color = "secondary"
  elseif fetchStatus == "offline" then
    text = "Offline, using local wallpapers"
    color = "error"
  elseif fetchStatus == "api-error" then
    text = "API error"
    color = "error"
  end

  return ui.label({ text = text, fontSize = 12, color = color, visible = text ~= "" })
end

local function currentLabel()
  local current = status.current

  if current == nil then
    return "-"
  end

  local name = string.match(current.path, "[^/]+$") or current.path
  local index = status.currentIndex or 0
  local total = status.currentTotal or 0
  local counter = if index > 0 and total > 0 then `({index}/{total}) ` else ""

  return `{counter}[{current.purity}] {name}`
end

local function tagColor(purity)
  if purity == "nsfw" then
    return "error"
  elseif purity == "sketchy" then
    return "tertiary"
  end

  return "on_surface_variant"
end

local function tagChip(tag)
  local color = tagColor(tag.purity)

  return ui.row({
    key = `tag-{tag.id}`,
    paddingH = 6,
    paddingV = 3,
    radius = 6,
    fill = "surface_container",
    border = if color == "on_surface_variant" then "outline_variant" else color,
    borderWidth = 1,
    onClick = function()
      tagsDeadlineMs = nil
      setValue("tags", `id:{tag.id}`, true)
    end,
  }, {
    ui.label({ text = tag.name, fontSize = 11, color = color }),
  })
end

local function tagRows()
  local rows = {}
  local row = {}
  local rowWidth = 0

  for _, tag in ipairs(status.imageTags or {}) do
    local width = #tag.name * CHIP_CHAR_WIDTH + CHIP_PADDING

    if #row > 0 and rowWidth + width > CHIP_ROW_WIDTH then
      table.insert(rows, ui.row({ gap = CHIP_GAP, align = "center", justify = "start" }, row))
      row = {}
      rowWidth = 0
    end

    table.insert(row, tagChip(tag))
    rowWidth += width + CHIP_GAP
  end

  if #row > 0 then
    table.insert(rows, ui.row({ gap = CHIP_GAP, align = "center", justify = "start" }, row))
  end

  return rows
end

local function profileSection()
  local items = {}

  for index, name in ipairs(status.profiles or {}) do
    table.insert(items, {
      key = `profile-{index}`,
      label = name,
      checked = index == status.activeProfile,
      onClick = function()
        request("setProfile", index)
      end,
    })
  end

  return section({
    sectionTitle("Profile"),
    segmented(items),
  })
end

local function searchSection()
  return section({
    sectionTitle("Tags / Keywords"),
    ui.input({
      key = `tags-{status.activeProfile or 0}-{tagsInputRev}`,
      value = tagsInputText or "",
      placeholder = "e.g. nature landscape",
      controlSize = "sm",
      onChange = function(value)
        tagsInputText = value
        tagsDeadlineMs = noctalia.nowMs() + TAGS_DEBOUNCE_MS
      end,
      onSubmit = function(value)
        tagsInputText = value
        commitTags(true)
      end,
    }),
    fetchStatusLine(),
    ui.row({ gap = 16 }, {
      segmented({ toggleItem("sfw", "SFW"), toggleItem("sketchy", "Sketchy"), toggleItem("nsfw", "NSFW") }),
      segmented({ toggleItem("general", "General"), toggleItem("anime", "Anime"), toggleItem("people", "People") }),
    }),
  })
end

local function optionRow(key, label)
  return ui.row({ gap = 10, align = "center" }, {
    ui.toggle({
      checked = settings()[key] == true,
      onChange = function(value)
        setValue(key, value == "true", false)
      end,
    }),
    ui.label({ text = label, fontSize = 13, color = "on_surface", flexGrow = 1 }),
  })
end

local function optionsSection()
  local minutes = status.displayMinutes or 5

  return section({
    optionRow("localOnly", "Saved wallpapers only (no downloads)"),
    optionRow("coverMode", "Fill screen (crop)"),
    ui.row({ gap = 10, align = "center" }, {
      ui.label({ text = "Rotate every", fontSize = 14, color = "on_surface" }),
      ui.button({
        glyph = "minus",
        variant = "secondary",
        controlSize = "sm",
        onClick = function()
          request("setDisplayMinutes", minutes - 1)
        end,
      }),
      ui.label({ text = `{minutes} min`, fontSize = 14, color = "primary" }),
      ui.button({
        glyph = "plus",
        variant = "secondary",
        controlSize = "sm",
        onClick = function()
          request("setDisplayMinutes", minutes + 1)
        end,
      }),
    }),
  })
end

local function currentSection()
  local saved = status.isSaved == true
  local downloading = status.isDownloading == true
  local paused = status.timerPaused == true
  local children = {
    sectionTitle("Current"),
    ui.label({ text = currentLabel(), fontSize = 13, color = "on_surface", maxLines = 3 }),
    ui.row({ gap = 8, align = "center" }, {
      ui.progress({
        progress = status.timerProgress or 0,
        height = 6,
        radius = 3,
        fill = "primary",
        track = "surface_container",
        flexGrow = 1,
      }),
      ui.button({
        glyph = if paused then "player-play" else "player-pause",
        variant = "ghost",
        controlSize = "sm",
        onClick = function()
          request("toggleTimer")
        end,
      }),
    }),
  }

  for _, row in ipairs(tagRows()) do
    table.insert(children, row)
  end

  table.insert(children, ui.row({ gap = 8 }, {
    ui.button({
      text = if saved then "Saved" else "Save",
      glyph = if saved then "check" else nil,
      variant = if saved then "secondary" else "primary",
      controlSize = "sm",
      flexGrow = 1,
      onClick = function()
        request(if saved then "delete" else "save")
      end,
    }),
    ui.button({
      text = if downloading then "Downloading..." else "Next",
      variant = "secondary",
      controlSize = "sm",
      enabled = not downloading,
      flexGrow = 1,
      onClick = function()
        request("next")
      end,
    }),
    ui.button({
      text = "Block",
      variant = "destructive",
      controlSize = "sm",
      enabled = status.current ~= nil,
      flexGrow = 1,
      onClick = function()
        request("block")
      end,
    }),
  }))

  return section(children)
end

local function debugSection()
  local children = {
    ui.button({
      text = "Debug",
      glyph = if debugExpanded then "chevron-down" else "chevron-right",
      variant = "ghost",
      controlSize = "sm",
      contentAlign = "start",
      onClick = function()
        debugExpanded = not debugExpanded
        render()
      end,
    }),
  }

  if not debugExpanded then
    return section(children)
  end

  local response = debug.response or ""

  if #response > DEBUG_PREVIEW_LIMIT then
    response = string.sub(response, 1, DEBUG_PREVIEW_LIMIT) .. "..."
  end

  table.insert(children, ui.row({ gap = 8 }, {
    ui.button({
      text = "Copy Query URL",
      glyph = "copy",
      variant = "outline",
      controlSize = "sm",
      flexGrow = 1,
      enabled = (debug.url or "") ~= "",
      onClick = function()
        noctalia.copyToClipboard(debug.url or "", "text/plain")
      end,
    }),
    ui.button({
      text = "Copy API Response",
      glyph = "copy",
      variant = "outline",
      controlSize = "sm",
      flexGrow = 1,
      enabled = (debug.response or "") ~= "",
      onClick = function()
        noctalia.copyToClipboard(debug.response or "", "text/plain")
      end,
    }),
  }))
  table.insert(children, ui.label({ text = "Last query", fontSize = 12, fontWeight = "bold", color = "on_surface_variant" }))
  table.insert(children, ui.label({ text = if debug.url ~= nil and debug.url ~= "" then debug.url else "-", fontSize = 11, color = "on_surface" }))
  table.insert(children, ui.label({ text = "Last response", fontSize = 12, fontWeight = "bold", color = "on_surface_variant" }))
  table.insert(children, ui.column({ fill = "surface_container", radius = 6, padding = 8 }, {
    ui.label({ text = if response ~= "" then response else "-", fontSize = 11, color = "on_surface", maxLines = 14 }),
  }))

  return section(children)
end

function render()
  if not isOpen then
    return
  end

  panel.render(ui.scroll({ flexGrow = 1, gap = 0 }, {
    ui.row({ paddingH = 16, paddingV = 14 }, {
      ui.label({ text = "Wallpapers", fontSize = 18, fontWeight = "bold", color = "on_surface" }),
    }),
    ui.separator({}),
    profileSection(),
    ui.separator({}),
    searchSection(),
    ui.separator({}),
    optionsSection(),
    ui.separator({}),
    currentSection(),
    ui.separator({}),
    debugSection(),
  }))
end

noctalia.state.watch("status", function(value)
  local previousTags = settings().tags
  local previousProfile = status.activeProfile

  status = value or {}

  local tags = settings().tags or ""

  if (tags ~= previousTags or status.activeProfile ~= previousProfile) and tags ~= tagsInputText then
    tagsInputRev += 1
    tagsInputText = tags
    tagsDeadlineMs = nil
  end

  render()
end)

noctalia.state.watch("debug", function(value)
  debug = value or {}

  if debugExpanded then
    render()
  end
end)

function update()
  if tagsDeadlineMs ~= nil and noctalia.nowMs() >= tagsDeadlineMs then
    commitTags(false)
  end
end

function onOpen(_context)
  isOpen = true
  status = noctalia.state.get("status") or status
  debug = noctalia.state.get("debug") or debug
  tagsInputText = settings().tags or ""
  tagsInputRev += 1
  panel.setWantsSecondTicks(true)
  render()
end

function onClose()
  if tagsDeadlineMs ~= nil then
    commitTags(false)
  end

  isOpen = false
end
