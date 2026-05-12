import { createState } from "ags"
import { exec, execAsync } from "ags/process"
import { monitorFile } from "ags/file"

const iface = exec("sh -c 'ls -w1 /sys/class/backlight | head -1'")
const hasInterface = !!iface
const maxValue = hasInterface ? Number(exec("brightnessctl max")) : 1

const [screenValue, _setScreenValue] = createState(0)

function setScreenValue(percent: number) {
  if (percent < 0) percent = 0
  if (percent > 1) percent = 1
  execAsync(`brightnessctl set ${percent * 100}% -q`)
}

function onChange() {
  _setScreenValue(Number(exec("brightnessctl get")) / maxValue)
}

if (hasInterface) {
  monitorFile(`/sys/class/backlight/${iface}/brightness`, onChange)
  onChange()
}

export { screenValue, setScreenValue, hasInterface }
