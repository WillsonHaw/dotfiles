--!nonstrict
local counter = 0

return function(action, value)
  counter += 1

  noctalia.state.set("request", {
    id = `{noctalia.nowMs()}-{counter}-{math.random(1, 1000000000)}`,
    action = action,
    value = value,
  })
end
