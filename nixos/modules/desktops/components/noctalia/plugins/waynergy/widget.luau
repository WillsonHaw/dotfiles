--!nonstrict
local running = false
local checking = false
local toggling = false

local function render()
  if running then
    barWidget.setGlyph("cast")
    barWidget.setGlyphColor("primary")
    barWidget.setTooltip("Waynergy: Running")
  else
    barWidget.setGlyph("cast-off")
    barWidget.setGlyphColor("on_surface")
    barWidget.setTooltip("Waynergy: Stopped")
  end
end

local function refresh()
  if checking then
    return
  end

  checking = noctalia.runAsync({ "pgrep", "-x", "waynergy" }, function(result)
    checking = false
    running = result.exitCode == 0
    render()
  end)
end

function update()
  noctalia.setUpdateInterval(3000)
  render()
  refresh()
end

function onClick()
  if toggling then
    return
  end

  local action = running and "stop" or "start"

  toggling = noctalia.runAsync({ "systemctl", "--user", action, "waynergy.service" }, function(result)
    toggling = false

    if result.exitCode ~= 0 then
      noctalia.log(`systemctl --user {action} waynergy.service failed: {result.stderr}`)
    end

    refresh()
  end)
end
