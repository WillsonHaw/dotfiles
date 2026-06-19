import { Astal } from "ags/gtk3"
import Gtk from "gi://Gtk?version=3.0"
import Gdk from "gi://Gdk?version=3.0"
import app from "ags/gtk3/app"

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

export default function Calendar() {
  const dismiss = () => { const w = app.get_window("calendar"); if (w) w.visible = false }

  return (
    <window
      name="calendar"
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={app}
      visible={false}
      onKeyPressEvent={(_self: any, event: Gdk.EventKey) => {
        if (event.keyval === Gdk.KEY_Escape) dismiss()
      }}
    >
      <eventbox onClickRelease={dismiss}>
        <box halign={Gtk.Align.CENTER} valign={Gtk.Align.START} marginTop={44}>
          <eventbox>
            <Gtk.Calendar
              showDayNames
              showDetails
              showHeading
              showWeekNumbers
              onDaySelected={(self: any) => {
                const [y, m, d] = self.get_date()
                print(`${y}. ${m}. ${d}.`)
              }}
              class="calendar"
            />
          </eventbox>
        </box>
      </eventbox>
    </window>
  )
}
