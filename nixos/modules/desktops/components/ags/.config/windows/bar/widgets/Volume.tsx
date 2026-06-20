import { createBinding, createComputed } from "ags"
import { exec } from "ags/process"
import AstalWp from "gi://AstalWp"
import Gtk from "gi://Gtk?version=4.0"

const wp = AstalWp.get_default()!
const speaker = wp.audio.defaultSpeaker!

function getIcon(volume: number, muted: boolean): string {
  if (muted || volume < 0.01) return "󰖁"
  if (volume > 0.66) return "󰕾"
  if (volume > 0.33) return "󰖀"
  return "󰕿"
}

export default function Volume() {
  const volume = createBinding(speaker, "volume")
  const mute = createBinding(speaker, "mute")
  const icon = createComputed(() => getIcon(volume(), mute()))
  const tooltip = createComputed(() => `Volume: ${Math.round(volume() * 100)}%`)
  const cls = createComputed(() =>
    ["pill-btn pill-start vol-btn", mute() ? "muted" : ""].filter(Boolean).join(" ")
  )

  return (
    <button
      class={cls}
      tooltipText={tooltip}
      onClicked={() => { speaker.mute = !speaker.mute }}
      $={(btn: any) => {
        const rightClick = new Gtk.GestureClick({ button: 3 })
        rightClick.connect("released", () => exec("pavucontrol"))
        btn.add_controller(rightClick)

        const scroll = new Gtk.EventControllerScroll()
        scroll.set_flags(Gtk.EventControllerScrollFlags.VERTICAL)
        scroll.connect("scroll", (_c: any, _dx: number, dy: number) => {
          const delta = dy > 0 ? -0.02 : 0.02
          speaker.volume = Math.max(0, Math.min(1.5, speaker.volume + delta))
          return true
        })
        btn.add_controller(scroll)
      }}
    >
      <label label={icon} />
    </button>
  )
}
