import Gtk from "gi://Gtk?version=3.0"
import BarGroup from "./BarGroup"
import Battery from "./widgets/Battery"
import Brightness from "./widgets/Brightness"
import Clock from "./widgets/Clock"
import Network from "./widgets/Network"
import Power from "./widgets/Power"
import SystemTray from "./widgets/SystemTray"
import Volume from "./widgets/Volume"

function ControlsGroup() {
  return (
    <BarGroup className="controls">
      <Network />
      <Battery />
      <Brightness />
      <Volume />
    </BarGroup>
  )
}

export default function BottomSection() {
  return (
    <box class="section bottom" vertical valign={Gtk.Align.END}>
      <SystemTray />
      <ControlsGroup />
      <Clock />
      <Power />
    </box>
  )
}
