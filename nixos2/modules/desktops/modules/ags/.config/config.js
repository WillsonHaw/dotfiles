// modules/desktops/modules/ags/src/windows/bar/BarGroup.ts
var BarGroup = ({
  className,
  ...props
}) => Widget.Box({
  className: `group ${className}`,
  vertical: true,
  ...props
});
var BarGroup_default = BarGroup;

// modules/desktops/modules/ags/src/windows/bar/BarWidget.ts
var BarWidget = ({
  className,
  ...props
}) => Widget.Button({
  className: `widget ${className}`,
  ...props
});
var BarWidget_default = BarWidget;

// modules/desktops/modules/ags/src/windows/bar/widgets/Launcher.ts
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

// modules/desktops/modules/ags/src/windows/bar/widgets/Workspaces.ts
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

// modules/desktops/modules/ags/src/windows/bar/TopSection.ts
var TopSection = Widget.Box({
  className: "section top",
  vertical: true,
  vpack: "start",
  children: [Launcher_default, Workspaces_default]
});
var TopSection_default = TopSection;

// modules/desktops/modules/ags/src/windows/bar/widgets/Battery.ts
var battery = await Service.import("battery");
var Battery = BarWidget_default({
  className: "battery",
  child: Widget.CircularProgress({
    className: `circular-progress`,
    visible: battery.bind("available"),
    rounded: true,
    child: Widget.Icon({
      className: "icon",
      icon: battery.bind("icon_name")
    }),
    value: battery.bind("percent").as((p) => p / 100)
  })
});
var Battery_default = Battery;

// modules/desktops/modules/ags/src/services/brightness.ts
var BrightnessService = class extends Service {
  static {
    Service.register(
      this,
      {
        // 'name-of-signal': [type as a string from GObject.TYPE_<type>],
        "screen-changed": ["float"]
      },
      {
        // 'kebab-cased-name': [type as a string from GObject.TYPE_<type>, 'r' | 'w' | 'rw']
        // 'r' means readable
        // 'w' means writable
        // guess what 'rw' means
        "screen-value": ["float", "rw"]
      }
    );
  }
  // this Service assumes only one device with backlight
  #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'");
  // # prefix means private in JS
  #screenValue = 0;
  #maxValue = Number(Utils.exec("brightnessctl max"));
  // the getter has to be in snake_case
  get screen_value() {
    return this.#screenValue;
  }
  // the setter has to be in snake_case too
  set screen_value(percent) {
    if (percent < 0)
      percent = 0;
    if (percent > 1)
      percent = 1;
    Utils.execAsync(`brightnessctl set ${percent * 100}% -q`);
  }
  constructor() {
    super();
    const brightness = `/sys/class/backlight/${this.#interface}/brightness`;
    Utils.monitorFile(brightness, () => this.#onChange());
    this.#onChange();
  }
  #onChange() {
    this.#screenValue = Number(Utils.exec("brightnessctl get")) / this.#maxValue;
    this.emit("changed");
    this.notify("screen-value");
    this.emit("screen-changed", this.#screenValue);
  }
  // overwriting the connect method, let's you
  // change the default event that widgets connect to
  connect(event = "screen-changed", callback) {
    return super.connect(event, callback);
  }
};
var service = new BrightnessService();
var brightness_default = service;

// modules/desktops/modules/ags/src/windows/bar/widgets/Brightness.ts
var showBar = Variable(false);
var Brightness = Widget.EventBox({
  className: "widget brightness",
  onHover: () => showBar.setValue(true),
  onHoverLost: () => showBar.setValue(false),
  child: Widget.Box({
    vertical: true,
    children: [
      Widget.Revealer({
        className: "bar",
        revealChild: showBar.bind(),
        transition: "slide_up",
        child: Widget.Slider({
          onChange: ({ value }) => brightness_default.screen_value = value,
          vertical: true,
          inverted: true,
          value: brightness_default.bind("screen_value"),
          min: 0,
          max: 1,
          marks: []
        })
      }),
      Widget.CircularProgress({
        className: `circular-progress`,
        rounded: true,
        child: Widget.Label({
          className: "icon large",
          label: "\u{F00E0}"
        }),
        value: brightness_default.bind("screen_value")
      })
    ]
  })
});
var Brightness_default = Brightness;

// modules/desktops/modules/ags/src/windows/bar/widgets/Clock.ts
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

// modules/desktops/modules/ags/src/windows/bar/widgets/Network.ts
var network = await Service.import("network");
var WifiIndicator = Widget.CircularProgress({
  className: `widget circular-progress network`,
  rounded: true,
  child: Widget.Icon({
    className: "icon",
    icon: network.wifi.bind("icon_name")
  }),
  value: network.wifi.bind("strength").as((v) => v / 100),
  tooltipText: network.wifi.bind("ssid").as((v) => `Connected to ${v}`)
});
var WiredIndicator = Widget.CircularProgress({
  className: `circular-progress`,
  rounded: true,
  child: Widget.Icon({
    className: "icon",
    icon: network.wired.bind("icon_name")
  }),
  value: 1
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

// modules/desktops/modules/ags/src/windows/bar/widgets/SystemTray.ts
var systemtray = await Service.import("systemtray");
var SystemTrayItem = (item) => Widget.Button({
  className: "widget",
  // @ts-expect-error
  child: Widget.Icon({ className: "icon large" }).bind("icon", item, "icon"),
  tooltipMarkup: item.bind("tooltip_markup"),
  onPrimaryClick: (_, event) => item.activate(event),
  onSecondaryClick: (_, event) => item.openMenu(event)
});
var SystemTray = BarGroup_default({
  className: "system-tray",
  children: systemtray.bind("items").as((i) => i.map(SystemTrayItem))
});
var SystemTray_default = SystemTray;

// modules/desktops/modules/ags/src/windows/bar/widgets/Volume.ts
var audio = await Service.import("audio");
var showBar2 = Variable(false);
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
var Volume = Widget.EventBox({
  className: "widget volume",
  onHover: () => showBar2.setValue(true),
  onHoverLost: () => showBar2.setValue(false),
  child: Widget.Box({
    vertical: true,
    children: [
      Widget.Revealer({
        className: "bar",
        revealChild: showBar2.bind(),
        transition: "slide_up",
        child: Widget.Slider({
          onChange: ({ value }) => audio.speaker.volume = value,
          vertical: true,
          inverted: true,
          value: audio.speaker.bind("volume"),
          min: 0,
          max: 1,
          marks: []
        })
      }),
      Widget.CircularProgress({
        className: `circular-progress`,
        rounded: true,
        child: Widget.Label({
          className: "icon large",
          label: "\uF026"
        }),
        value: audio.speaker.bind("volume")
      }).hook(audio, (self) => {
        self.child.label = getIcon(audio.speaker.volume, audio.speaker.is_muted);
      })
    ]
  })
});
var Volume_default = Volume;

// modules/desktops/modules/ags/src/windows/bar/BottomSection.ts
var ControlsGroup = BarGroup_default({
  className: "controls",
  children: [Network_default, Battery_default, Brightness_default, Volume_default]
});
var BottomSection = Widget.Box({
  className: "section bottom",
  vertical: true,
  vpack: "end",
  children: [SystemTray_default, ControlsGroup, Clock_default]
});
var BottomSection_default = BottomSection;

// modules/desktops/modules/ags/src/windows/bar/Bar.ts
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

// modules/desktops/modules/ags/src/windows/index.ts
var windows_default = [Bar_default];

// modules/desktops/modules/ags/src/config.ts
App.config({
  style: `${App.configDir}/styles.css`,
  windows: windows_default
});
