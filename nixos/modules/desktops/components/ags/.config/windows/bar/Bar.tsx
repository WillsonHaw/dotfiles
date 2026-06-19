import { Astal } from "ags/gtk3"
import app from "ags/gtk3/app"
import Gtk from "gi://Gtk?version=3.0"

import Launcher from "./widgets/Launcher"
import Workspaces from "./widgets/Workspaces"
import HardwareStats from "./widgets/HardwareStats"
import Clock from "./widgets/Clock"
import Weather from "./widgets/Weather"
import Bluetooth from "./widgets/Bluetooth"
import Network from "./widgets/Network"
import Tailscale from "./widgets/Tailscale"
import Waynergy from "./widgets/Waynergy"
import IdleInhibitor from "./widgets/IdleInhibitor"
import Volume from "./widgets/Volume"
import Brightness from "./widgets/Brightness"
import PowerProfile from "./widgets/PowerProfile"
import Battery from "./widgets/Battery"
import Wallpaper from "./widgets/Wallpaper"
import SystemTray from "./widgets/SystemTray"

const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
const { EXCLUSIVE } = Astal.Exclusivity

function BarLeft() {
  return (
    <box class="bar-left" spacing={6}>
      <Launcher />
      <Workspaces />
      <HardwareStats />
    </box>
  )
}

function BarCenter() {
  return (
    <box spacing={6}>
      <Weather />
      <Clock />
    </box>
  )
}

function BarRight() {
  return (
    <box class="bar-right" spacing={6} halign={Gtk.Align.END} hexpand>
      <box class="pill">
        <Bluetooth />
        <Network />
        <Tailscale />
      </box>
      <box class="pill">
        <Waynergy />
        <IdleInhibitor />
        <Wallpaper />
      </box>
      <box class="pill">
        <Volume />
        <Brightness />
        <PowerProfile />
        <Battery />
      </box>
      <SystemTray />
      <button
        class="pill-btn pill-only power-btn"
        onClicked={() => {
          const w = app.get_window("power-menu")
          if (w) w.visible = !w.visible
        }}
      >
        <label label="⏻" />
      </button>
    </box>
  )
}

export default function Bar() {
  return (
    <window
      name="bar"
      anchor={TOP | LEFT | RIGHT}
      exclusivity={EXCLUSIVE}
      application={app}
      visible
    >
      <centerbox class="bar" startWidget={<BarLeft /> as any} centerWidget={<BarCenter /> as any} endWidget={<BarRight /> as any} />
    </window>
  )
}
