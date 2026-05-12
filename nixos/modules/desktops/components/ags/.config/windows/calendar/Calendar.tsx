import { Astal } from "ags/gtk3"
import Gtk from "gi://Gtk?version=3.0"
import Gdk from "gi://Gdk?version=3.0"
import app from "ags/gtk3/app"

const { BOTTOM, LEFT } = Astal.WindowAnchor

export default function Calendar() {
  return (
    <window
      name="calendar"
      anchor={BOTTOM | LEFT}
      marginBottom={30}
      marginLeft={60}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={app}
      visible={false}
      onKeyPressEvent={(self: any, event: Gdk.EventKey) => {
        const [, keyval] = event.get_keyval()
        if (keyval === Gdk.KEY_Escape) self.visible = false
      }}
    >
      <Gtk.Calendar
        showDayNames
        showDetails
        showHeading
        showWeekNumbers
        onDaySelected={(self: any) => {
          const [y, m, d] = self.get_date()
          print(`${y}. ${m}. ${d}.`)
        }}
        className="calendar"
      />
    </window>
  )
}
