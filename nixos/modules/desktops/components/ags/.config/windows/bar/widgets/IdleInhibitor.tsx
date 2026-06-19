import { createState, createComputed } from "ags"
import { execAsync } from "ags/process"

const [inhibited, setInhibited] = createState(false)
let inhibitorPid = ""

async function enable() {
  try {
    const pid = await execAsync("bash -c 'systemd-inhibit --what=idle --who=ags-bar --why=User sleep infinity >/dev/null 2>&1 & echo $!'")
    inhibitorPid = pid.trim()
    setInhibited(true)
  } catch {
    setInhibited(false)
  }
}

function disable() {
  if (inhibitorPid) {
    execAsync(["kill", inhibitorPid]).catch(() => {})
    inhibitorPid = ""
  }
  setInhibited(false)
}

const icon = createComputed(() => inhibited() ? "󰅶" : "󰾪")
const tooltip = createComputed(() => inhibited() ? "Idle inhibitor: on" : "Idle inhibitor: off")
const cls = createComputed(() => ["pill-btn ii-btn", inhibited() ? "activated" : ""].filter(Boolean).join(" "))

export default function IdleInhibitor() {
  return (
    <button
      class={cls}
      tooltipText={tooltip}
      onClicked={() => (inhibited() ? disable() : enable())}
    >
      <label label={icon} />
    </button>
  )
}
