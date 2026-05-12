import { createState, createComputed } from "ags"
import Gtk from "gi://Gtk?version=3.0"
import { screenValue, setScreenValue, hasInterface } from "../../../services/brightness"

export default function Brightness() {
  const [showBar, setShowBar] = createState(false)

  const tooltipText = createComputed(() =>
    hasInterface ? `Brightness: ${Math.round(screenValue() * 100)}%` : "Brightness: N/A",
  )

  const value = createComputed(() => (hasInterface ? screenValue() : 1))

  return (
    <eventbox
      class="widget brightness"
      onHover={() => setShowBar(hasInterface)}
      onHoverLost={() => setShowBar(false)}
    >
      <box vertical>
        <revealer class="bar" revealChild={showBar} transitionType={Gtk.RevealerTransitionType.SLIDE_UP}>
          <slider
            vertical
            inverted
            value={screenValue}
            min={0}
            max={1}
            onDragged={(self: any) => setScreenValue(self.value)}
          />
        </revealer>
        <circularprogress class="circular-progress" rounded value={value} tooltipText={tooltipText}>
          <label class={`icon ${hasInterface ? "large" : "medium"}`} label={hasInterface ? "󰛨" : "󰹏"} />
        </circularprogress>
      </box>
    </eventbox>
  )
}
