import { createPoll } from "ags/time"
import { execAsync } from "ags/process"
import app from "ags/gtk3/app"

const MINUTE = 60_000

const hour = createPoll("--", MINUTE, async () => {
  try { return (await execAsync("date '+%H'")).trim() } catch { return "--" }
})
const min = createPoll("--", MINUTE, async () => {
  try { return (await execAsync("date '+%M'")).trim() } catch { return "--" }
})
const date = createPoll("", MINUTE, async () => {
  try { return (await execAsync("date '+%a %d %b'")).trim() } catch { return "" }
})

export default function Clock() {
  return (
    <button
      class="pill-btn pill-only clock-btn"
      tooltipText={date}
      onClicked={() => {
        const w = app.get_window("calendar")
        if (w) w.visible = !w.visible
      }}
    >
      <box spacing={2}>
        <label label={hour} />
        <label class="clock-sep" label=":" />
        <label label={min} />
      </box>
    </button>
  )
}
