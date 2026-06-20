import { Astal } from "ags/gtk4"
import Gtk from "gi://Gtk?version=4.0"
import Gdk from "gi://Gdk?version=4.0"
import app from "ags/gtk4/app"
import { exec } from "ags/process"

function PowerAction({ icon, label, action }: { icon: string; label: string; action: () => void }) {
  return (
    <button
      class="power-action"
      onClicked={() => {
        action()
        const w = app.get_window("power-menu")
        if (w) w.visible = false
      }}
    >
      <box orientation={Gtk.Orientation.VERTICAL}>
        <label class="icon x-large" label={icon} />
        <label class="label" label={label} />
      </box>
    </button>
  )
}

export default function PowerMenu() {
  return (
    <window
      name="power-menu"
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={app}
      visible={false}
      $={(win: any) => {
        const key = new Gtk.EventControllerKey()
        key.connect("key-pressed", (_c: any, keyval: number) => {
          if (keyval === Gdk.KEY_Escape) { win.visible = false; return true }
          return false
        })
        win.add_controller(key)
      }}
    >
      <box class="power-menu">
        <PowerAction icon="" label="Reload Hyprland" action={() => exec("hyprctl reload")} />
        <PowerAction icon="󰤄" label="Suspend" action={() => exec("sleep 0.1 && systemctl suspend || loginctl suspend")} />
        <PowerAction icon="" label="Reboot" action={() => exec("reboot")} />
        <PowerAction icon="" label="Lock" action={() => exec("hyprlock")} />
        <PowerAction icon="󰍃" label="Logout" action={() => exec("wlogout")} />
        <PowerAction icon="⏻" label="Shutdown" action={() => exec("shutdown now")} />
      </box>
    </window>
  )
}
