import { createBinding, createComputed } from "ags"
import AstalBattery from "gi://AstalBattery"

const battery = AstalBattery.get_default()
const ICONS = ["󱊡", "󱊢", "󱊣"]

export default function Battery() {
  const present = createBinding(battery, "isPresent")
  const pct = createBinding(battery, "percentage")
  const charging = createBinding(battery, "charging")

  const icon = createComputed(() => {
    if (!present() || charging()) return "󰚥"
    return ICONS[Math.min(Math.floor(pct() * 3), 2)]
  })

  const tooltip = createComputed(() =>
    present() ? `Battery: ${Math.round(pct() * 100)}%${charging() ? " (charging)" : ""}` : "Plugged in"
  )

  const cls = createComputed(() => {
    let c = "pill-btn pill-end bat-btn"
    if (present() && !charging()) {
      if (pct() < 0.15) c += " critical"
      else if (pct() < 0.20) c += " warning"
    }
    return c
  })

  return (
    <button class={cls} tooltipText={tooltip}>
      <label label={icon} />
    </button>
  )
}
