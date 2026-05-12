import { createState, createBinding, createComputed } from "ags"
import { exec } from "ags/process"
import Gtk from "gi://Gtk?version=3.0"
import AstalWp from "gi://AstalWp"

const wp = AstalWp.get_default()!
const speaker = wp.audio.defaultSpeaker!

function getIcon(volume: number, isMuted: boolean): string {
  if (isMuted) return ""
  if (volume > 0.66) return ""
  if (volume > 0.2) return ""
  if (volume > 0.01) return ""
  return ""
}

export default function Volume() {
  const [showBar, setShowBar] = createState(false)

  const volume = createBinding(speaker, "volume")
  const mute = createBinding(speaker, "mute")

  const icon = createComputed(() => getIcon(volume(), mute()))
  const tooltipText = createComputed(() => `Volume: ${Math.round(volume() * 100)}%`)

  return (
    <eventbox
      class="widget volume"
      onHover={() => setShowBar(true)}
      onHoverLost={() => setShowBar(false)}
      onClickRelease={(self: any, event: any) => {
        if (event.button === 3) exec("pavucontrol")
      }}
    >
      <box vertical>
        <revealer class="bar" revealChild={showBar} transitionType={Gtk.RevealerTransitionType.SLIDE_UP}>
          <slider
            vertical
            inverted
            value={volume}
            min={0}
            max={1}
            onDragged={(self: any) => { speaker.volume = self.value }}
          />
        </revealer>
        <button onClicked={() => { speaker.mute = !speaker.mute }}>
          <circularprogress class="circular-progress" rounded value={volume} tooltipText={tooltipText}>
            <label class="icon large" label={icon} />
          </circularprogress>
        </button>
      </box>
    </eventbox>
  )
}
