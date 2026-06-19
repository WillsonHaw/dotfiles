import { createComputed } from "ags"
import { createPoll } from "ags/time"
import { execAsync } from "ags/process"

let prevIdle = 0
let prevTotal = 0

const cpu = createPoll("0", 3000, async () => {
  try {
    const r = (await execAsync(["bash", "-c",
      "awk '/^cpu /{idle=$5+$6; total=0; for(i=2;i<=NF;i++) total+=$i; print idle, total}' /proc/stat"
    ])).trim()
    const [idleStr, totalStr] = r.split(" ")
    const idle = Number(idleStr), total = Number(totalStr)
    const di = idle - prevIdle, dt = total - prevTotal
    const pct = dt > 0 ? Math.round(100 * (1 - di / dt)) : 0
    prevIdle = idle; prevTotal = total
    return String(Math.max(0, Math.min(100, pct)))
  } catch { return "0" }
})

const mem = createPoll("0", 5000, async () => {
  try {
    return (await execAsync(["bash", "-c",
      "awk '/MemTotal/{t=$2} /MemAvailable/{a=$2} END{print int((t-a)*100/t)}' /proc/meminfo"
    ])).trim()
  } catch { return "0" }
})

const disk = createPoll("0", 30000, async () => {
  try {
    return (await execAsync(["bash", "-c",
      "df --output=pcent / 2>/dev/null | tail -1 | tr -d ' %'"
    ])).trim()
  } catch { return "0" }
})

const temp = createPoll("0", 5000, async () => {
  try {
    return (await execAsync(["bash", "-c",
      "cat /sys/class/thermal/thermal_zone*/temp 2>/dev/null | sort -n | tail -1 | awk '{print int($1/1000)}'"
    ])).trim()
  } catch { return "0" }
})

export default function HardwareStats() {
  const text = createComputed(() =>
    `󰍛 ${cpu()}%  󰑭 ${mem()}%  󰋊 ${disk()}%  󰔏 ${temp()}°`
  )
  return (
    <button class="pill-btn pill-only stats-btn">
      <label label={text} />
    </button>
  )
}
