--!nonstrict
local connected = false
local ip = nil
local checking = false
local toggling = false

local function render()
  if connected then
    barWidget.setGlyph("shield-lock")
    barWidget.setGlyphColor("primary")
    barWidget.setTooltip(`Tailscale: {ip or "connected"}`)
  else
    barWidget.setGlyph("shield-off")
    barWidget.setGlyphColor("on_surface")
    barWidget.setTooltip("Tailscale: disconnected")
  end
end

local function refresh()
  if checking then
    return
  end

  checking = noctalia.runAsync({ "tailscale", "status", "--json" }, function(result)
    checking = false
    connected = result.exitCode == 0 and string.match(result.stdout, '"BackendState":%s*"Running"') ~= nil
    ip = string.match(result.stdout, '"TailscaleIPs":%s*%[%s*"([%d%.]+)"')
    render()
  end)
end

function update()
  noctalia.setUpdateInterval(5000)
  render()
  refresh()
end

function onClick()
  if toggling then
    return
  end

  local command = if connected then { "tailscale", "down" } else { "tailscale", "up", "--accept-routes" }

  toggling = noctalia.runAsync(command, function(result)
    toggling = false

    if result.exitCode ~= 0 then
      noctalia.log(`{table.concat(command, " ")} failed: {result.stderr}`)
    end

    refresh()
  end)
end
