import { exec } from "ags/process"
import BarGroup from "../BarGroup"
import BarWidget from "../BarWidget"

export default function Launcher() {
  return (
    <BarGroup className="launcher">
      <BarWidget onClicked={() => exec("/home/slumpy/.config/rofi/launchers/type-6/launcher.sh")}>
        <label label="" />
      </BarWidget>
    </BarGroup>
  )
}
