import { createComputed } from "ags"
import { createPoll } from "ags/time"
import { execAsync } from "ags/process"

const raw = createPoll("0", 3000, async () => {
  try { return (await execAsync("bash -c \"pgrep -x waynergy >/dev/null 2>&1 && echo 1 || echo 0\"")).trim() }
  catch { return "0" }
})

const running = createComputed(() => raw().trim() === "1")
const tooltip = createComputed(() => running() ? "Waynergy: running" : "Waynergy: stopped")
const cls = createComputed(() => ["pill-btn pill-start wy-btn", running() ? "active" : ""].filter(Boolean).join(" "))

export default function Waynergy() {
  return (
    <button
      class={cls}
      tooltipText={tooltip}
      onClicked={() => execAsync(
        running()
          ? ["systemctl", "--user", "stop", "waynergy.service"]
          : ["systemctl", "--user", "start", "waynergy.service"]
      ).catch(() => {})}
    >
      <label label="󰢹" />
    </button>
  )
}
