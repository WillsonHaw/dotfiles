import { createBinding, createComputed } from "ags"
import AstalNetwork from "gi://AstalNetwork"
import BarWidget from "../BarWidget"

const network = AstalNetwork.get_default()

export default function Network() {
  const primary = createBinding(network, "primary")

  const icon = createComputed(() => {
    if (primary() === AstalNetwork.Primary.WIRED) return ""

    const wifi = network.wifi
    if (!wifi) return "󰤯"

    const strength = wifi.strength
    const percent = strength / 100

    if (percent > 0.8) return "󰤨"
    if (percent > 0.6) return "󰤥"
    if (percent > 0.4) return "󰤢"
    if (percent > 0.2) return "󰤟"
    return "󰤯"
  })

  const value = createComputed(() => {
    if (primary() === AstalNetwork.Primary.WIRED) return 1
    const wifi = network.wifi
    return wifi ? wifi.strength / 100 : 0
  })

  const tooltipText = createComputed(() => {
    if (primary() === AstalNetwork.Primary.WIRED) return "Connected via Ethernet"
    const wifi = network.wifi
    return wifi ? `Connected to ${wifi.ssid}` : "No connection"
  })

  return (
    <BarWidget className="network">
      <circularprogress class="circular-progress" rounded value={value} tooltipText={tooltipText}>
        <label class="icon medium" label={icon} />
      </circularprogress>
    </BarWidget>
  )
}
