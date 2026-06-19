import { execAsync } from "ags/process"
import GLib from "gi://GLib"

const launcherScript = `${GLib.get_home_dir()}/.config/ags/scripts/rofi-launcher`

export default function Launcher() {
  return (
    <button
      class="pill-btn pill-only launcher-btn"
      onClicked={() => execAsync(["bash", launcherScript]).catch(() => {})}
    >
      <label label="󱄅" />
    </button>
  )
}
