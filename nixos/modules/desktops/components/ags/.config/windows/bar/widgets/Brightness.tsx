import { createComputed } from "ags"
import { screenValue, setScreenValue, hasInterface } from "../../../services/brightness"
import Gtk from "gi://Gtk?version=4.0"

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
    <button
      class="pill-btn bright-btn"
      tooltipText={tooltip}
      $={(btn: any) => {
        const scroll = new Gtk.EventControllerScroll()
        scroll.set_flags(Gtk.EventControllerScrollFlags.VERTICAL)
        scroll.connect("scroll", (_c: any, _dx: number, dy: number) => {
          if (!hasInterface) return false
          const delta = dy > 0 ? -0.05 : 0.05
          setScreenValue(screenValue() + delta)
          return true
        })
        btn.add_controller(scroll)
      }}
    >
      <label label={icon} />
    </button>
  )
}
