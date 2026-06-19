import { createComputed } from "ags"
import { createPoll } from "ags/time"
import { execAsync } from "ags/process"

const PROFILES = ["power-saver", "balanced", "performance"] as const
type Profile = typeof PROFILES[number]

const raw = createPoll("balanced", 5000, async () => {
  try { return (await execAsync("powerprofilesctl get")).trim() }
  catch { return "balanced" }
})

const profile = createComputed((): Profile => raw().trim() as Profile)

const icon = createComputed(() => {
  switch (profile()) {
    case "performance": return "󱐋"
    case "power-saver": return "󰌪"
    default:            return "󰗑"
  }
})

const tooltip = createComputed(() => `Power profile: ${profile()}`)
const cls = createComputed(() => `pill-btn pp-btn pp-${profile()}`)

function cycleProfile() {
  const idx = PROFILES.indexOf(profile())
  const next = PROFILES[(idx + 1) % PROFILES.length]
  execAsync(`powerprofilesctl set ${next}`).catch(() => {})
}

export default function PowerProfile() {
  return (
    <button class={cls} tooltipText={tooltip} onClicked={cycleProfile}>
      <label label={icon} />
    </button>
  )
}
