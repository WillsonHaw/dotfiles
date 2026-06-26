import { createComputed } from "ags"
import app from "ags/gtk4/app"
import Gtk from "gi://Gtk?version=4.0"
import wallpaper from "../../../services/wallpaper"

export default function Wallpaper() {
  const tooltip = createComputed(() => {
    const w = wallpaper.currentWallpaper()
    return w ? (w.path.split("/").pop() ?? "Wallpaper") : "Wallpaper"
  })

  return (
    <button
      class="pill-btn pill-end wp-btn"
      tooltipText={tooltip}
      onClicked={() => {
        const w = app.get_window("wallpaper-settings-menu")
        if (w) w.visible = !w.visible
      }}
    >
      <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
        <label class="wp-icon" label="󰸉" vexpand />
        <levelbar
          class="wp-bar-timer"
          value={createComputed(() => wallpaper.timerProgress())}
          minValue={0}
          maxValue={1}
          hexpand
        />
      </box>
    </button>
  )
}
