--!nonstrict
local request = require("./lib/request.luau")

local PANEL_ID = "slumpy/wallhaven:panel"

local status = noctalia.state.get("status") or {}

local function tooltip()
  local current = status.current

  if current == nil then
    return "Wallhaven"
  end

  local name = string.match(current.path, "[^/]+$") or current.path

  return `{name} [{current.purity}]`
end

local function render()
  local progress = status.timerProgress or 0

  barWidget.render(ui.column({ gap = 2, align = "center" }, {
    ui.glyph({ name = if status.isDownloading then "cloud-download" else "photo" }),
    ui.progress({
      progress = progress,
      width = 16,
      height = 3,
      radius = 2,
      fill = if status.timerPaused then "primary/0.4" else "primary/0.85",
      track = "on_surface/0.15",
      visible = progress > 0,
    }),
  }))
  barWidget.setTooltip(tooltip())
end

noctalia.state.watch("status", function(value)
  status = value or {}
  render()
end)

function update()
  noctalia.setUpdateInterval(60000)
  render()
end

function onClick()
  noctalia.togglePanel(PANEL_ID)
end

function onRightClick()
  request("next")
end

render()
