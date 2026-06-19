import { createComputed } from "ags"
import { createPoll } from "ags/time"
import { execAsync } from "ags/process"
import Gtk from "gi://Gtk?version=3.0"
import GLib from "gi://GLib"

const homeDir = GLib.get_home_dir()
const ICON_ON  = `${homeDir}/.config/ags/assets/tailscale.svg`
const ICON_OFF = `${homeDir}/.config/ags/assets/tailscale-off.svg`

const raw = createPoll("0", 5000, async () => {
  try { return (await execAsync("bash -c \"tailscale status >/dev/null 2>&1 && echo 1 || echo 0\"")).trim() }
  catch { return "0" }
})

const connected = createComputed(() => raw().trim() === "1")
const tooltip  = createComputed(() => connected() ? "Tailscale: connected" : "Tailscale: disconnected")
const iconPath = createComputed(() => connected() ? ICON_ON : ICON_OFF)
const cls = createComputed(() => ["pill-btn pill-end ts-btn", connected() ? "connected" : ""].filter(Boolean).join(" "))

export default function Tailscale() {
  return (
    <button
      class={cls}
      tooltipText={tooltip}
      onClicked={() => execAsync(connected() ? "tailscale down" : "tailscale up").catch(() => {})}
    >
      <Gtk.Image file={iconPath} />
    </button>
  )
}
