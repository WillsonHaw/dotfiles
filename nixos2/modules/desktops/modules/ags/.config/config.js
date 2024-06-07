// nixos2/modules/desktops/modules/ags/src/windows/bar/BarGroup.ts
var BarGroup = ({
  className,
  ...props
}) => Widget.Box({
  className: `group ${className}`,
  vertical: true,
  ...props
});
var BarGroup_default = BarGroup;

// nixos2/modules/desktops/modules/ags/src/windows/bar/BarWidget.ts
var BarWidget = ({
  className,
  ...props
}) => Widget.Button({
  className: `widget ${className}`,
  ...props
});
var BarWidget_default = BarWidget;

// nixos2/modules/desktops/modules/ags/src/windows/bar/widgets/Launcher.ts
var Launcher = BarGroup_default({
  className: "launcher",
  children: [
    BarWidget_default({
      onClicked: () => Utils.exec("/home/slumpy/.config/rofi/launchers/type-6/launcher.sh"),
      child: Widget.Label({ label: "\uF135" })
    })
  ]
});
var Launcher_default = Launcher;

// nixos2/modules/desktops/modules/ags/src/windows/bar/widgets/Workspaces.ts
var hyprland = await Service.import("hyprland");
var dispatch = (ws) => hyprland.messageAsync(`dispatch workspace ${ws}`);
var Workspaces = BarGroup_default({
  className: "workspaces",
  children: Array.from({ length: 5 }, (_, i) => i + 1).map(
    (id) => BarWidget_default({
      setup: (self) => {
        self.hook(hyprland, () => {
          self.toggleClassName("active", hyprland.active.workspace.id === id);
          self.toggleClassName(
            "occupied",
            (hyprland.workspaces.find((w) => w.id === id)?.windows ?? 0) > 0
          );
        });
      },
      className: `workspace ws-${id}`,
      onClicked: () => dispatch(id),
      child: Widget.Label({
        setup: (self) => {
          self.bind(
            "label",
            hyprland.active.workspace,
            "id",
            (ws) => ws === id ? "\uF444" : "\uF4C3"
          );
        }
      })
    })
  )
});
var Workspaces_default = Workspaces;

// nixos2/modules/desktops/modules/ags/src/windows/bar/TopSection.ts
var TopSection = Widget.Box({
  className: "section top",
  vertical: true,
  vpack: "start",
  children: [Launcher_default, Workspaces_default]
});
var TopSection_default = TopSection;

// nixos2/modules/desktops/modules/ags/src/windows/bar/widgets/Battery.ts
var battery = await Service.import("battery");
var Battery = Widget.CircularProgress({
  className: `widget circular-progress battery`,
  visible: battery.bind("available"),
  rounded: true,
  child: Widget.Icon({
    className: "icon",
    icon: battery.bind("icon_name")
  }),
  value: battery.bind("percent").as((p) => p / 100)
});
var Battery_default = Battery;

// nixos2/modules/desktops/modules/ags/src/windows/bar/widgets/Clock.ts
var SECOND = 1e3;
var MINUTE = 60 * SECOND;
var clockHour = Variable("", { poll: [MINUTE, "date '+%H'"] });
var clockMin = Variable("", { poll: [SECOND, "date '+%M'"] });
var clockMonth = Variable("", { poll: [MINUTE, "date '+%a'"] });
var clockDay = Variable("", { poll: [MINUTE, "date '+%d'"] });
var Clock = BarGroup_default({
  className: "clock",
  children: [
    Widget.Label({ label: clockHour.bind() }),
    Widget.Label({ label: clockMin.bind() }),
    Widget.Label({ label: "\u2022\u2022" }),
    Widget.Label({ label: clockMonth.bind() }),
    Widget.Label({ label: clockDay.bind() })
  ]
});
var Clock_default = Clock;

// nixos2/modules/desktops/modules/ags/src/windows/bar/widgets/Network.ts
var network = await Service.import("network");
var WifiIndicator = Widget.Icon({
  className: "icon",
  icon: network.wifi.bind("icon_name")
});
var WiredIndicator = Widget.Icon({
  className: "icon",
  icon: network.wired.bind("icon_name")
});
var Network = Widget.Stack({
  className: "widget network",
  children: {
    wifi: WifiIndicator,
    wired: WiredIndicator
  },
  shown: network.bind("primary").as((p) => p || "wifi")
});
var Network_default = Network;

// nixos2/modules/desktops/modules/ags/src/windows/bar/widgets/SystemTray.ts
var systemtray = await Service.import("systemtray");
var SystemTrayItem = (item) => Widget.Button({
  // @ts-expect-error
  child: Widget.Icon({ className: "icon" }).bind("icon", item, "icon"),
  tooltipMarkup: item.bind("tooltip_markup"),
  onPrimaryClick: (_, event) => item.activate(event),
  onSecondaryClick: (_, event) => item.openMenu(event)
});
var SystemTray = BarGroup_default({
  className: "system-tray",
  children: systemtray.bind("items").as((i) => i.map(SystemTrayItem))
});
var SystemTray_default = SystemTray;

// nixos2/modules/desktops/modules/ags/src/windows/bar/widgets/Volume.ts
var audio = await Service.import("audio");
function getIcon(volume, isMuted) {
  let icon = "\uEEE8";
  if (isMuted) {
    return icon;
  } else if (volume > 0.66) {
    icon = "\uF028";
  } else if (volume > 0.2) {
    icon = "\uF027";
  } else if (volume > 0.01) {
    icon = "\uF026";
  }
  return icon;
}
var Volume = Widget.CircularProgress({
  className: `widget circular-progress volume`,
  rounded: true,
  child: Widget.Label({
    className: "icon large",
    label: "\uF026"
  }),
  value: audio.speaker.bind("volume")
  // @ts-expect-error
}).hook(audio, (self) => {
  self.child.label = getIcon(audio.speaker.volume, audio.speaker.is_muted);
});
var Volume_default = Volume;

// nixos2/modules/desktops/modules/ags/src/windows/bar/BottomSection.ts
var ControlsGroup = BarGroup_default({
  className: "controls",
  children: [Network_default, Battery_default, Volume_default]
});
var BottomSection = Widget.Box({
  className: "section bottom",
  vertical: true,
  vpack: "end",
  children: [SystemTray_default, ControlsGroup, Clock_default]
});
var BottomSection_default = BottomSection;

// nixos2/modules/desktops/modules/ags/src/windows/bar/Bar.ts
var root = Widget.CenterBox({
  className: "bar-window",
  vertical: true,
  startWidget: TopSection_default,
  endWidget: BottomSection_default
});
var Bar = Widget.Window({
  name: "bar",
  anchor: ["top", "left", "bottom"],
  child: root,
  visible: true
});
var Bar_default = Bar;

// nixos2/modules/desktops/modules/ags/src/windows/index.ts
var windows_default = [Bar_default];

// nixos2/modules/desktops/modules/ags/src/config.ts
App.config({
  style: `${App.configDir}/styles.css`,
  windows: windows_default
});
