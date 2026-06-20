import { createBinding, createComputed } from "ags"
import AstalBattery from "gi://AstalBattery"

const battery = AstalBattery.get_default()
const ICONS = ["󱊡", "󱊢", "󱊣"]

export default function Battery() {
  const present = createBinding(battery, "isPresent")
  const pct = createBinding(battery, "percentage")
  const charging = createBinding(battery, "charging")
  const timeToEmpty = createBinding(battery, "timeToEmpty")
  const timeToFull = createBinding(battery, "timeToFull")

  function formatTime(seconds: number): string {
    if (seconds <= 0) return ""
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  const icon = createComputed(() => {
    if (!present() || charging()) return "󰚥"
    return ICONS[Math.min(Math.floor(pct() * 3), 2)]
  })

  const tooltip = createComputed(() => {
    if (!present()) return "Plugged in"
    const base = `Battery: ${Math.round(pct() * 100)}%`
    if (charging()) {
      const t = formatTime(Number(timeToFull()))
      return t ? `${base} · ${t} until full` : `${base} (charging)`
    }
    const t = formatTime(Number(timeToEmpty()))
    return t ? `${base} · ${t} remaining` : base
  })

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
