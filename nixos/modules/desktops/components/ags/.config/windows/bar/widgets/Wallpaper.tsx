import { exec } from "ags/process"
import Gtk from "gi://Gtk?version=3.0"
import app from "ags/gtk3/app"
import wallpaper from "../../../services/wallhaven"
import BarGroup from "../BarGroup"
import BarWidget from "../BarWidget"

function createMenu(): Gtk.Menu {
  const menu = new Gtk.Menu()

  const items = [
    { label: "Save Current Wallpaper", action: () => wallpaper.saveCurrentWallpaper() },
    { label: "Browse Local", action: () => exec("waypaper") },
    { label: "Details", action: () => { const w = app.get_window("wallpaper-details-menu"); if (w) w.visible = true } },
    { label: "Settings", action: () => { const w = app.get_window("wallpaper-settings-menu"); if (w) w.visible = true } },
  ]

  items.forEach(({ label, action }) => {
    const item = new Gtk.MenuItem({ label })
    item.connect("activate", action)
    menu.append(item)
  })

  menu.show_all()
  return menu
}

const rightClickMenu = createMenu()

export default function Wallpaper() {
  return (
    <BarGroup className="wallpaper">
      <BarWidget
        onClicked={() => wallpaper.random()}
        onClickRelease={(self: any, event: any) => {
          if (event.button === 3) rightClickMenu.popup_at_pointer(event)
        }}
      >
        <button>
          <label class="icon large" label="󰸉" />
        </button>
      </BarWidget>
    </BarGroup>
  )
}
