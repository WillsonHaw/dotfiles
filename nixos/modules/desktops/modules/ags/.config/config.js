// nixos/modules/desktops/modules/ags/src/windows/bar/BarGroup.ts
var BarGroup = ({
  className,
  ...props
}) => Widget.Box({
  className: `group ${className}`,
  vertical: true,
  ...props
});
var BarGroup_default = BarGroup;

// nixos/modules/desktops/modules/ags/src/windows/bar/BarWidget.ts
var BarWidget = ({ className, ...props }) => Widget.Button({
  className: `widget ${className}`,
  ...props
});
var BarWidget_default = BarWidget;

// nixos/modules/desktops/modules/ags/src/windows/bar/widgets/Launcher.ts
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

// nixos/modules/desktops/modules/ags/src/services/wallpaper.ts
var WallpaperService = class extends Service {
  static {
    Service.register(
      this,
      {},
      {
        folders: ["jsobject", "r"]
      }
    );
  }
  _wallpapers = /* @__PURE__ */ new Map();
  _currentWallpaper = null;
  _monitors = [];
  get folders() {
    return Array.from(this._wallpapers.values());
  }
  constructor(...wallpaperFolders) {
    super();
    wallpaperFolders.forEach((wallpaperFolder) => {
      const getWallpapers = () => {
        this._wallpapers.set(wallpaperFolder, {
          path: wallpaperFolder,
          enabled: true,
          wallpapers: this.#loadFiles(wallpaperFolder)
        });
      };
      this._monitors.push(
        Utils.monitorFile(wallpaperFolder, () => {
          print(`[Wallpaper] Wallpapers in ${wallpaperFolder} changed. Reloading folder.`);
          getWallpapers();
        })
      );
      getWallpapers();
    });
    this._currentWallpaper = Utils.exec(`swww query`).split(": ").pop() ?? null;
    print("[Wallpaper] Current wallpaper:", this._currentWallpaper);
  }
  #loadFiles(folder) {
    const files = Utils.exec(`ls -A1 ${folder}`);
    return files.split("\n").map((file) => `${folder}/${file}`);
  }
  enableFolder(folderPath) {
    print(`[Wallpaper] Enabling folder ${folderPath}`);
    const folder = this._wallpapers.get(folderPath);
    if (folder) {
      folder.enabled = true;
    }
  }
  disableFolder(folderPath) {
    print(`[Wallpaper] Disabling folder ${folderPath}`);
    const folder = this._wallpapers.get(folderPath);
    if (folder) {
      folder.enabled = false;
      if (this._currentWallpaper?.startsWith(folderPath)) {
        this.random();
      }
    }
  }
  random() {
    const enabledFolders = Array.from(this._wallpapers.entries()).filter(
      ([_, folder]) => folder.enabled
    );
    print(`[Wallpaper] Getting random wallpaper from one of: ${enabledFolders.join(", ")}`);
    if (enabledFolders.length === 0) {
      return;
    }
    const folderIndex = Math.floor(enabledFolders.length * Math.random());
    const wallpapers = enabledFolders[folderIndex][1].wallpapers;
    const fileIndex = Math.floor(wallpapers.length * Math.random());
    const nextWallpaper = wallpapers[fileIndex];
    print(`[Wallpaper] Requesting next wallpaper: ${nextWallpaper}`);
    if (nextWallpaper === this._currentWallpaper && (this._wallpapers.size > 1 || wallpapers.length > 1)) {
      print(`[Wallpaper] Wallpaper is the same as the current one. Getting a new one.`);
      this.random();
    } else {
      this._currentWallpaper = nextWallpaper;
      Utils.exec(`swww img --resize fit ${nextWallpaper}`);
    }
  }
};
var wallpaper = new WallpaperService(
  "/home/slumpy/Wallpapers/sfw",
  "/home/slumpy/Wallpapers/nsfw"
);
var wallpaper_default = wallpaper;

// nixos/modules/desktops/modules/ags/src/windows/bar/widgets/Wallpaper.ts
var RightClickMenu = Widget.Menu({
  children: [
    Widget.MenuItem({
      onActivate: () => App.openWindow("wallpaper-settings-menu"),
      child: Widget.Label("Settings")
    })
  ]
});
var Wallpaper = BarGroup_default({
  className: "wallpaper",
  children: [
    BarWidget_default({
      onClicked: () => wallpaper_default.random(),
      // @ts-expect-error
      onSecondaryClickRelease: (_, event) => RightClickMenu.popup_at_pointer(event),
      child: Widget.Button({
        child: Widget.Label({
          className: "icon large",
          label: "\u{F0E09}"
        })
      })
    })
  ]
});
var Wallpaper_default = Wallpaper;

// nixos/modules/desktops/modules/ags/src/windows/bar/widgets/Workspaces.ts
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

// nixos/modules/desktops/modules/ags/src/windows/bar/TopSection.ts
var TopSection = Widget.Box({
  className: "section top",
  vertical: true,
  vpack: "start",
  children: [Launcher_default, Wallpaper_default, Workspaces_default]
});
var TopSection_default = TopSection;

// nixos/modules/desktops/modules/ags/src/windows/bar/widgets/Battery.ts
var battery = await Service.import("battery");
var Battery = BarWidget_default({
  className: "battery",
  child: battery.available ? Widget.CircularProgress({
    className: `circular-progress`,
    visible: battery.bind("available"),
    rounded: true,
    child: Widget.Icon({
      className: "icon",
      icon: battery.bind("icon_name")
    }),
    tooltipText: battery.bind("percent").as((p) => `Battery: ${p}% Remaining`),
    value: battery.bind("percent").as((p) => p / 100)
  }) : Widget.CircularProgress({
    className: `circular-progress`,
    visible: battery.bind("available"),
    rounded: true,
    child: Widget.Label({
      className: "icon medium",
      label: "\uF1E6"
    }),
    tooltipText: "Plugged In",
    value: 1
  })
});
var Battery_default = Battery;

// nixos/modules/desktops/modules/ags/src/services/brightness.ts
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
        "screen-value": ["float", "rw"],
        "has-interface": ["boolean", "r"]
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
    if (percent < 0) percent = 0;
    if (percent > 1) percent = 1;
    Utils.execAsync(`brightnessctl set ${percent * 100}% -q`);
  }
  get has_interface() {
    return !!this.#interface;
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

// nixos/modules/desktops/modules/ags/src/windows/bar/widgets/Brightness.ts
var showBar = Variable(false);
var Brightness = Widget.EventBox({
  className: "widget brightness",
  onHover: () => showBar.setValue(brightness_default.has_interface),
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
          className: `icon ${brightness_default.has_interface ? "large" : "medium"}`,
          label: brightness_default.has_interface ? "\u{F06E8}" : "\u{F0E4F}"
        }),
        value: brightness_default.bind("screen_value").as((v) => brightness_default.has_interface ? v : 1),
        tooltipText: brightness_default.bind("screen_value").as((v) => brightness_default.has_interface ? `Brightness: ${v}%` : `Brightness: N/A`)
      })
    ]
  })
});
var Brightness_default = Brightness;

// nixos/modules/desktops/modules/ags/src/windows/bar/widgets/Clock.ts
var SECOND = 1e3;
var MINUTE = 60 * SECOND;
var clockHour = Variable("", { poll: [MINUTE, "date '+%H'"] });
var clockMin = Variable("", { poll: [SECOND, "date '+%M'"] });
var clockMonth = Variable("", { poll: [MINUTE, "date '+%a'"] });
var clockDay = Variable("", { poll: [MINUTE, "date '+%d'"] });
var Clock = BarGroup_default({
  className: "clock",
  children: [
    Widget.Button({
      onClicked: () => App.openWindow("calendar"),
      child: Widget.Box({
        vertical: true,
        children: [
          Widget.Label({ label: clockHour.bind() }),
          Widget.Label({ label: clockMin.bind() }),
          Widget.Label({ label: "\u2022\u2022" }),
          Widget.Label({ label: clockMonth.bind() }),
          Widget.Label({ label: clockDay.bind() })
        ]
      })
    })
  ]
});
var Clock_default = Clock;

// nixos/modules/desktops/modules/ags/src/windows/bar/widgets/Network.ts
var network = await Service.import("network");
function getIcon() {
  return network.primary === "wired" ? network.wired.bind("icon_name") : network.wifi.bind("icon_name");
}
function getStrength() {
  return network.primary === "wired" ? 1 : network.wifi.bind("strength").as((v) => v / 100);
}
function getTooltip() {
  return network.primary === "wired" ? "Connect via Ethernet" : network.wifi.bind("ssid").as((v) => `Connected to ${v}`);
}
var Network = BarWidget_default({
  className: "network",
  child: Widget.CircularProgress({
    className: `circular-progress`,
    rounded: true,
    child: Widget.Icon({
      className: "icon",
      icon: getIcon()
    }),
    value: getStrength(),
    tooltipText: getTooltip()
  })
});
var Network_default = Network;

// nixos/modules/desktops/modules/ags/src/windows/bar/widgets/Power.ts
var Power = BarGroup_default({
  className: "power",
  children: [
    BarWidget_default({
      onClicked: () => App.openWindow("power-menu"),
      child: Widget.Button({
        child: Widget.Label({
          className: "icon large",
          label: "\u23FB"
        })
      })
    })
  ]
});
var Power_default = Power;

// nixos/modules/desktops/modules/ags/src/windows/bar/widgets/SystemTray.ts
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
  visible: systemtray.bind("items").as((i) => i.length > 0),
  children: systemtray.bind("items").as((i) => i.map(SystemTrayItem))
});
var SystemTray_default = SystemTray;

// nixos/modules/desktops/modules/ags/src/windows/bar/widgets/Volume.ts
var audio = await Service.import("audio");
var showBar2 = Variable(false);
function getIcon2(volume, isMuted) {
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
      Widget.Button({
        onClicked: () => audio.speaker.is_muted = !audio.speaker.is_muted,
        child: Widget.CircularProgress({
          className: `circular-progress`,
          rounded: true,
          child: Widget.Label({
            className: "icon large",
            label: "\uF026"
          }),
          tooltipText: audio.speaker.bind("volume").as((v) => `Volume: ${Math.round(v * 100)}%`),
          value: audio.speaker.bind("volume")
        }).hook(audio, (self) => {
          self.child.label = getIcon2(audio.speaker.volume, audio.speaker.is_muted);
        })
      })
    ]
  })
});
var Volume_default = Volume;

// nixos/modules/desktops/modules/ags/src/windows/bar/BottomSection.ts
var ControlsGroup = BarGroup_default({
  className: "controls",
  children: [Network_default, Battery_default, Brightness_default, Volume_default]
});
var BottomSection = Widget.Box({
  className: "section bottom",
  vertical: true,
  vpack: "end",
  children: [SystemTray_default, ControlsGroup, Clock_default, Power_default]
});
var BottomSection_default = BottomSection;

// nixos/modules/desktops/modules/ags/src/windows/bar/Bar.ts
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

// nixos/modules/desktops/modules/ags/src/windows/calendar/Calendar.ts
var Root = Widget.Calendar({
  className: "calendar",
  showDayNames: true,
  showDetails: true,
  showHeading: true,
  showWeekNumbers: true,
  // detail: (self, y, m, d) => {
  //   return `<span color="white">${y}. ${m}. ${d}.</span>`;
  // },
  onDaySelected: ({ date: [y, m, d] }) => {
    print(`${y}. ${m}. ${d}.`);
  }
});
var Calendar = Widget.Window({
  name: "calendar",
  anchor: ["bottom", "left"],
  margins: [30, 60],
  child: Root,
  layer: "overlay",
  keymode: "exclusive",
  // keymode: 'on-demand',
  visible: false
}).keybind([], "Escape", () => App.closeWindow("calendar")).hook(App, (self, name, visible) => {
  if (name === "calendar") {
    self.visible = visible;
  }
});
var Calendar_default = Calendar;

// nixos/modules/desktops/modules/ags/src/windows/power-menu/PowerMenu.ts
var PowerAction = (icon, label, action) => Widget.Button({
  className: "power-action",
  onClicked: () => {
    action();
    App.toggleWindow("power-menu");
  },
  child: Widget.Box({
    vertical: true,
    children: [
      Widget.Label({
        className: "icon x-large",
        label: icon
      }),
      Widget.Label({
        className: "label",
        label
      })
    ]
  })
});
var Root2 = Widget.Box({
  className: "power-menu",
  children: [
    PowerAction("\uF359", "Reload Hyprland", () => Utils.exec("hyprctl reload")),
    PowerAction(
      "\u{F0904}",
      "Suspend",
      () => Utils.exec("sleep 0.1 && systemctl suspend || loginctl suspend")
    ),
    PowerAction("\uF0E2", "Reboot", () => Utils.exec("reboot")),
    PowerAction("\uF023", "Lock", () => Utils.exec("hyprlock")),
    PowerAction("\u{F0343}", "Logout", () => Utils.exec("wlogout")),
    PowerAction("\u23FB", "Shutdown", () => Utils.exec("shutdown now"))
  ]
});
var PowerMenu = Widget.Window({
  name: "power-menu",
  anchor: [],
  child: Root2,
  layer: "overlay",
  keymode: "exclusive",
  visible: false
}).keybind([], "Escape", () => App.closeWindow("power-menu")).hook(App, (self, name, visible) => {
  if (name === "power-menu") {
    self.visible = visible;
  }
});
var PowerMenu_default = PowerMenu;

// nixos/modules/desktops/modules/ags/src/windows/wallpaper/WallpaperSettings.ts
var Root3 = Widget.Box({
  className: "wallpaper-settings",
  vertical: true,
  children: [
    Widget.Label({
      className: "title",
      label: "Enable/Disable sources"
    }),
    ...wallpaper_default.folders.map(
      (folder) => Widget.Box({
        children: [
          Widget.Switch({
            className: folder.enabled ? "active" : "inactive",
            active: folder.enabled,
            onActivate: ({ active }) => active ? wallpaper_default.enableFolder(folder.path) : wallpaper_default.disableFolder(folder.path)
          }),
          Widget.Label({
            label: folder.path
          })
        ]
      })
    ),
    Widget.Button({
      className: "button",
      onClicked: () => App.closeWindow("wallpaper-settings-menu"),
      child: Widget.Label("Close")
    })
  ]
});
var WallpaperSettings = Widget.Window({
  name: "wallpaper-settings-menu",
  anchor: [],
  child: Root3,
  layer: "overlay",
  keymode: "exclusive",
  visible: false
}).keybind([], "Escape", () => App.closeWindow("wallpaper-settings-menu")).hook(App, (self, name, visible) => {
  if (name === "wallpaper-settings-menu") {
    self.visible = visible;
  }
});
var WallpaperSettings_default = WallpaperSettings;

// nixos/modules/desktops/modules/ags/src/windows/index.ts
var windows_default = [Bar_default, Calendar_default, PowerMenu_default, WallpaperSettings_default];

// nixos/modules/desktops/modules/ags/src/config.ts
App.config({
  style: `${App.configDir}/styles.css`,
  windows: windows_default
});
