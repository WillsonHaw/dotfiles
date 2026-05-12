import { createBinding, createComputed } from "ags"
import AstalBattery from "gi://AstalBattery"
import BarWidget from "../BarWidget"

const battery = AstalBattery.get_default()

export default function Battery() {
  const isAvailable = createBinding(battery, "isPresent")
  const percentage = createBinding(battery, "percentage")
  const iconName = createBinding(battery, "iconName")

  const tooltipText = createComputed(() =>
    isAvailable()
      ? `Battery: ${Math.round(percentage() * 100)}% Remaining`
      : "Plugged In",
  )

  const value = createComputed(() => (isAvailable() ? percentage() : 1))

  return (
    <BarWidget className="battery">
      <circularprogress class="circular-progress" rounded value={value} tooltipText={tooltipText}>
        {isAvailable()
          ? <icon icon={iconName} class="icon" />
          : <label class="icon medium" label="" />}
      </circularprogress>
    </BarWidget>
  )
}
