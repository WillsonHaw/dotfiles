import { createComputed } from "ags"
import { screenValue, setScreenValue, hasInterface } from "../../../services/brightness"

const ICONS = ["󱩎", "󱩏", "󱩐", "󱩑", "󱩒", "󱩓", "󱩔", "󱩕", "󱩖", "󰛨"]

const icon = createComputed(() => {
  if (!hasInterface) return "󰹏"
  const idx = Math.min(Math.floor(screenValue() * ICONS.length), ICONS.length - 1)
  return ICONS[idx]
})

const tooltip = createComputed(() =>
  hasInterface ? `Brightness: ${Math.round(screenValue() * 100)}%` : "Brightness: N/A"
)

export default function Brightness() {
  return (
    <eventbox
      onScroll={(_self: any, event: any) => {
        if (!hasInterface) return
        const delta = event.delta_y > 0 ? -0.05 : 0.05
        setScreenValue(screenValue() + delta)
      }}
    >
      <button class="pill-btn bright-btn" tooltipText={tooltip}>
        <label label={icon} />
      </button>
    </eventbox>
  )
}
