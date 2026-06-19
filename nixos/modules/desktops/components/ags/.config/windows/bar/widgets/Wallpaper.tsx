import { createComputed } from "ags"
import app from "ags/gtk3/app"
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
      <label label="󰸉" />
    </button>
  )
}
