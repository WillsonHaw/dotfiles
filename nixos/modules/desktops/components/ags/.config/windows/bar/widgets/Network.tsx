import { createBinding, createComputed } from "ags"
import { execAsync } from "ags/process"
import AstalNetwork from "gi://AstalNetwork"

const network = AstalNetwork.get_default()

function wifiIcon(strength: number): string {
  if (strength > 80) return "󰤨"
  if (strength > 60) return "󰤥"
  if (strength > 40) return "󰤢"
  if (strength > 20) return "󰤟"
  return "󰤯"
}

export default function Network() {
  const primary = createBinding(network, "primary")

  const icon = createComputed(() => {
    if (primary() === AstalNetwork.Primary.WIRED) return "󰈀"
    const wifi = network.wifi
    if (!wifi) return "󰤭"
    return wifiIcon(wifi.strength)
  })

  const tooltip = createComputed(() => {
    if (primary() === AstalNetwork.Primary.WIRED) return "Ethernet"
    const wifi = network.wifi
    return wifi ? `${wifi.ssid} (${wifi.strength}%)` : "Disconnected"
  })

  const cls = createComputed(() =>
    ["pill-btn net-btn", primary() === AstalNetwork.Primary.UNKNOWN ? "disconnected" : ""].filter(Boolean).join(" ")
  )

  return (
    <button
      class={cls}
      tooltipText={tooltip}
      onClicked={() => execAsync("nm-connection-editor").catch(() => {})}
    >
      <label label={icon} />
    </button>
  )
}
