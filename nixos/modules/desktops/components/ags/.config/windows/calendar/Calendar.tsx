import { Astal } from "ags/gtk4"
import Gtk from "gi://Gtk?version=4.0"
import Gdk from "gi://Gdk?version=4.0"
import app from "ags/gtk4/app"

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

export default function Calendar() {
  const dismiss = () => { const w = app.get_window("calendar"); if (w) w.visible = false }

  let popup: any = null

  return (
    <window
      name="calendar"
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={app}
      visible={false}
      $={(win: any) => {
        const key = new Gtk.EventControllerKey()
        key.connect("key-pressed", (_c: any, keyval: number) => {
          if (keyval === Gdk.KEY_Escape) { dismiss(); return true }
          return false
        })
        win.add_controller(key)

        const click = new Gtk.GestureClick()
        click.connect("released", (_c: any, _n: number, x: number, y: number) => {
          if (!popup) { dismiss(); return }
          const [ok, rect] = popup.compute_bounds(win)
          if (!ok || x < rect.origin.x || x > rect.origin.x + rect.size.width ||
              y < rect.origin.y || y > rect.origin.y + rect.size.height) {
            dismiss()
          }
        })
        win.add_controller(click)
      }}
    >
      <box
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.START}
        marginTop={44}
        $={(box: any) => { popup = box }}
      >
        <Gtk.Calendar
          showDayNames
          showHeading
          showWeekNumbers
          onDaySelected={(self: any) => {
            const date = self.get_date()
            print(`${date.get_year()}. ${date.get_month()}. ${date.get_day_of_month()}.`)
          }}
          class="calendar"
        />
      </box>
    </window>
  )
}
