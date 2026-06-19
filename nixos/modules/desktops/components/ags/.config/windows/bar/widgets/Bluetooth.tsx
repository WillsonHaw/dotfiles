import { createComputed } from "ags"
import { createPoll } from "ags/time"
import { execAsync } from "ags/process"

const raw = createPoll("no", 5000, async () => {
  try { return (await execAsync("bash -c \"bluetoothctl show 2>/dev/null | awk '/Powered:/{print $2}'\"")).trim() }
  catch { return "no" }
})

const powered = createComputed(() => raw().trim() === "yes")
const icon = createComputed(() => powered() ? "󰂯" : "󰂲")
const tooltip = createComputed(() => powered() ? "Bluetooth: on" : "Bluetooth: off")

export default function Bluetooth() {
  return (
    <button class="pill-btn pill-start bt-btn" tooltipText={tooltip}>
      <label label={icon} />
    </button>
  )
}
