import Gtk from "gi://Gtk?version=3.0"
import Launcher from "./widgets/Launcher"
import Wallpaper from "./widgets/Wallpaper"
import Workspaces from "./widgets/Workspaces"

export default function TopSection() {
  return (
    <box class="section top" vertical valign={Gtk.Align.START}>
      <Launcher />
      <Wallpaper />
      <Workspaces />
    </box>
  )
}
