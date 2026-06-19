import { createBinding, createComputed } from "ags"
import { exec } from "ags/process"
import AstalWp from "gi://AstalWp"

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
    <eventbox
      onClickRelease={(self: any, event: any) => {
        if (event.button === 1) speaker.mute = !speaker.mute
        if (event.button === 3) exec("pavucontrol")
      }}
      onScroll={(_self: any, event: any) => {
        const delta = event.delta_y > 0 ? -0.02 : 0.02
        speaker.volume = Math.max(0, Math.min(1.5, speaker.volume + delta))
      }}
    >
      <button class={cls} tooltipText={tooltip}>
        <label label={icon} />
      </button>
    </eventbox>
  )
}
