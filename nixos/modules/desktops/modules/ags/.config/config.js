// nixos/modules/desktops/modules/ags/src/windows/bar/BarGroup.ts
var BarGroup = ({
  className,
  spacing = 0,
  ...props
}) => Widget.Box({
  className: `group ${className}`,
  spacing,
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

// nixos/modules/desktops/modules/ags/src/services/wallhaven.ts
var DEFAULT_TRANSITION_TIME = 1e3 * 60 * 5;
var ROOT_URL = "https://wallhaven.cc/api/v1";
var WallpaperService = class extends Service {
  static {
    Service.register(
      this,
      {},
      {
        general: ["boolean", "rw"],
        anime: ["boolean", "rw"],
        people: ["boolean", "rw"],
        sfw: ["boolean", "rw"],
        sketchy: ["boolean", "rw"],
        nsfw: ["boolean", "rw"],
        collection: ["string", "rw"],
        username: ["string", "rw"],
        "search-term": ["string", "rw"],
        apikey: ["string", "rw"],
        "display-time": ["int", "rw"],
        path: ["string", "r"],
        remaining: ["int", "r"],
        json: ["gobject", "r"],
        tags: ["gobject", "r"],
        meta: ["gobject", "r"]
      }
    );
  }
  #category = "111";
  #purity = "111";
  #apikey = "";
  #collection = "";
  #searchTerm = "";
  #username = "";
  #displayTime = DEFAULT_TRANSITION_TIME;
  #wallpapers = [];
  #configFile;
  #wallpaperFolder;
  #timer = null;
  #currentWallpaper = null;
  #tags = [];
  #meta = null;
  #getSaveFolder;
  get path() {
    return this.#currentWallpaper?.[0] ?? "-";
  }
  get remaining() {
    return this.#wallpapers.length;
  }
  get json() {
    return this.#currentWallpaper?.[1];
  }
  get tags() {
    return this.#tags;
  }
  get meta() {
    return this.#meta ? JSON.stringify(this.#meta, null, 2) : "Missing Metadata";
  }
  get general() {
    return this.#category[0 /* General */] === "1";
  }
  set general(v) {
    this.#setCategory(0 /* General */, v);
  }
  get anime() {
    return this.#category[1 /* Anime */] === "1";
  }
  set anime(v) {
    this.#setCategory(1 /* Anime */, v);
  }
  get people() {
    return this.#category[2 /* People */] === "1";
  }
  set people(v) {
    this.#setCategory(2 /* People */, v);
  }
  get sfw() {
    return this.#purity[0 /* SFW */] === "1";
  }
  set sfw(v) {
    this.#setPurity(0 /* SFW */, v);
  }
  get sketchy() {
    return this.#purity[1 /* Sketchy */] === "1";
  }
  set sketchy(v) {
    this.#setPurity(1 /* Sketchy */, v);
  }
  get nsfw() {
    return this.#purity[2 /* NSFW */] === "1";
  }
  set nsfw(v) {
    this.#setPurity(2 /* NSFW */, v);
  }
  get collection() {
    return this.#collection;
  }
  set collection(v) {
    this.#collection = v;
    this.#onChange("collection");
  }
  get username() {
    return this.#username;
  }
  set username(v) {
    this.#username = v;
    this.#onChange("username");
  }
  get search_term() {
    return this.#searchTerm;
  }
  set search_term(v) {
    this.#searchTerm = v;
    this.#onChange("search-term");
  }
  get apikey() {
    return this.#apikey;
  }
  set apikey(v) {
    this.#apikey = v;
    this.#onChange("apikey");
  }
  get display_time() {
    return this.#displayTime / 6e4;
  }
  set display_time(v) {
    this.#displayTime = v * 6e4;
    this.#onChange("display-time");
  }
  constructor(configFile, wallpaperFolder = "/tmp/wallpapers", getSaveFolder) {
    super();
    Utils.exec(`mkdir -p ${wallpaperFolder}`);
    ["sfw", "sketchy", "nsfw"].forEach((purity) => {
      Utils.exec(
        `mkdir -p ${getSaveFolder({
          id: "0",
          path: "https://picsum.photos/300/200",
          purity,
          short_url: "https://picsum.photos/300/200",
          url: "https://picsum.photos/300/200",
          colors: []
        })}`
      );
    });
    this.#configFile = configFile;
    this.#wallpaperFolder = wallpaperFolder;
    this.#getSaveFolder = getSaveFolder;
    this.#loadFile();
    this.#startTimer();
  }
  async random() {
    try {
      if (this.#wallpapers.length === 0) {
        await this.#fetchWallpapers();
      }
      print(`[Wallpaper] ${this.#wallpapers.length} wallpapers remaining in queue`);
      const wallpaper2 = this.#wallpapers.shift();
      if (!wallpaper2) {
        console.error("[Wallpaper] Could not fetch wallpapers");
        return;
      }
      const fileName = `${this.#wallpaperFolder}/${wallpaper2.path.split("/").pop()}`;
      print(`[Wallpaper] Downloading wallpaper: ${wallpaper2.path} to ${fileName}...`);
      const response = await Utils.execAsync(`curl -o ${fileName} ${wallpaper2.path}`);
      if (response) {
        print(`[Wallpaper] curl: ${response}`);
      }
      print(`[Wallpaper] Switching wallpaper to: ${fileName}`);
      const result = Utils.exec(`swww img --resize fit -t random ${fileName}`);
      if (result) {
        print(`[Wallpaper] swww: ${result}`);
      }
      this.#currentWallpaper = [fileName, wallpaper2];
      const tags = await this.#getTags(wallpaper2.id);
      this.#tags = tags;
      print(`[Wallpaper] ID: ${wallpaper2.id}`);
      print(`[Wallpaper] Tags: ${tags.map((t) => t.name).join(", ")}`);
      this.#onChange(["json", "path", "tags", "remaining"], false);
    } catch (err) {
      console.error(err);
    }
    this.#saveFile();
    this.#startTimer();
  }
  save() {
    this.#saveFile();
  }
  saveCurrentWallpaper() {
    if (!this.#currentWallpaper) {
      return;
    }
    const wallpaper2 = this.#currentWallpaper[1];
    const saveTo = this.#getSaveFolder(wallpaper2);
    print(`[Wallpaper] Saving current wallpaper to: ${saveTo}/${wallpaper2.path.split("/").pop()}`);
    const result = Utils.exec(`cp ${this.#currentWallpaper[0]} ${saveTo}`);
    if (result) {
      print(`[Wallpaper] cp: ${result}`);
    }
  }
  async #getTags(id) {
    if (!this.#apikey) {
      return;
    }
    const url = `${ROOT_URL}/w/${id}?apikey=${this.#apikey}`;
    print(`[Wallpaper] Fetching wallpaper tags at ${url}`);
    const response = await Utils.fetch(url);
    const detail = await response.json();
    const tags = detail.data.tags;
    return tags;
  }
  async #fetchWallpapers() {
    try {
      const url = this.#getUrl();
      print("[Wallpaper] Request:", url);
      const response = await Utils.fetch(url);
      const searchResult = await response.json();
      const { current_page, last_page } = searchResult.meta;
      print(
        `[Wallpaper] Received ${searchResult.data.length} wallpapers, ${current_page}/${last_page} pages`
      );
      this.#wallpapers = searchResult.data;
      this.#meta = searchResult.meta;
      this.#onChange("meta", false);
    } catch (err) {
      console.error(err);
    }
  }
  #onChange(notify, reset = true) {
    this.emit("changed");
    if (notify) {
      if (Array.isArray(notify)) {
        notify.forEach((n) => this.notify(n));
      } else {
        this.notify(notify);
      }
    }
    if (reset) {
      this.#wallpapers = [];
      this.#meta = null;
      this.#tags = [];
    }
    this.#saveFile();
  }
  #startTimer() {
    if (this.#timer) {
      this.#timer.destroy();
    }
    this.#timer = setTimeout(() => this.random(), this.#displayTime);
  }
  #loadFile() {
    try {
      const contents = Utils.readFile(this.#configFile);
      if (contents.length === 0) {
        print(`[Wallpaper] No config file found at ${this.#configFile}. Creating default config.`);
        this.#saveFile();
        return;
      }
      const json = JSON.parse(contents);
      this.#category = json.category;
      this.#purity = json.purity;
      this.#apikey = json.apikey;
      this.#collection = json.collection;
      this.#username = json.username;
      this.#searchTerm = json.searchTerm;
      this.#displayTime = parseInt(json.displayTime);
      this.#currentWallpaper = json.currentWallpaper;
      this.#tags = json.tags;
      this.#meta = json.meta;
    } catch (err) {
      if (err instanceof Error) {
        print(`[Wallpaper] Error reading config file (${this.#configFile}):
${err.message}`);
      } else {
        print(`[Wallpaper] Unknown error while reading config file: ${this.#configFile}`);
      }
    }
  }
  #saveFile() {
    try {
      const json = {
        category: this.#category,
        purity: this.#purity,
        apikey: this.#apikey,
        collection: this.#collection,
        username: this.#username,
        searchTerm: this.#searchTerm,
        displayTime: this.#displayTime,
        currentWallpaper: this.#currentWallpaper,
        tags: this.#tags,
        meta: this.#meta
      };
      Utils.writeFileSync(JSON.stringify(json, null, 2), this.#configFile);
    } catch (err) {
      if (err instanceof Error) {
        print(`[Wallpaper] Error writing config file (${this.#configFile}):
${err.message}`);
      } else {
        print(`[Wallpaper] Error while writing config file: ${this.#configFile}
${err}`);
      }
    }
  }
  #setCategory(flag, value) {
    const parts = this.#category.split("");
    parts[flag] = value ? "1" : "0";
    this.#category = parts.join("");
    this.#onChange(["general", "anime", "people"]);
  }
  #setPurity(flag, value) {
    const parts = this.#purity.split("");
    parts[flag] = value ? "1" : "0";
    this.#purity = parts.join("");
    this.#onChange(["sfw", "sketchy", "nsfw"]);
  }
  #getUrl() {
    const useCollection = !!(this.#collection && this.#username);
    const path = useCollection ? "/collections" : "/search";
    const params = {};
    if (this.#apikey) {
      params.apikey = this.#apikey;
    }
    if (!useCollection) {
      let seed;
      if (this.#meta && this.#meta.seed && this.#meta.current_page < this.#meta.last_page) {
        seed = this.#meta.seed;
        params.page = (this.#meta.current_page + 1).toString();
      } else {
        seed = Math.random().toString(36).slice(2, 8);
      }
      params.categories = this.#category;
      params.purity = this.#purity;
      params.sorting = "random";
      params.seed = seed;
      params.atleast = "2560x1080";
      params.ratios = "16x9,16x10,32x9,4x1,64x27,256x135";
      if (this.#searchTerm) {
        params.q = this.#searchTerm;
      }
    }
    return `${ROOT_URL}${path}?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&")}`;
  }
};
var wallpaper = new WallpaperService(
  "/home/slumpy/.wallhaven.config",
  "/tmp/wallhaven-downloads",
  (wallpaper2) => {
    return `/home/slumpy/Wallpapers/${wallpaper2.purity}`;
  }
);
var wallhaven_default = wallpaper;

// nixos/modules/desktops/modules/ags/src/windows/bar/widgets/Wallpaper.ts
var RightClickMenu = Widget.Menu({
  children: [
    Widget.MenuItem({
      onActivate: () => wallhaven_default.saveCurrentWallpaper(),
      child: Widget.Label("Save Current Wallpaper")
    }),
    Widget.MenuItem({
      onActivate: () => Utils.exec("waypaper"),
      child: Widget.Label("Browse Local")
    }),
    Widget.MenuItem({
      onActivate: () => App.openWindow("wallpaper-details-menu"),
      child: Widget.Label("Details")
    }),
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
      onClicked: () => wallhaven_default.random(),
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
  child: battery.bind("available").as(
    (available) => available ? Widget.CircularProgress({
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
  )
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
  if (network.primary === "wired") {
    return "\uEF44";
  }
  return network.wifi.bind("strength").as((v) => {
    const percent = v / 100;
    if (percent > 0.8) {
      return "\u{F0928}";
    } else if (percent > 0.6) {
      return "\u{F0925}";
    } else if (percent > 0.4) {
      return "\u{F0922}";
    } else if (percent > 0.2) {
      return "\u{F091F}";
    } else {
      return "\u{F092F}";
    }
  });
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
    child: Widget.Label({
      className: "icon medium",
      label: getIcon()
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
  spacing: 8,
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
var Switch = (prop, label) => Widget.Box({
  children: [
    Widget.Switch({
      className: wallhaven_default.bind(prop).as((v) => v ? "active" : ""),
      active: wallhaven_default.bind(prop),
      onActivate: ({ active }) => wallhaven_default[prop] = active
    }),
    Widget.Label(label)
  ]
});
var Input = (label, field, changeAction) => Widget.Box({
  className: "input",
  children: [
    Widget.Entry({
      className: "entry",
      text: wallhaven_default.bind(field).as((v) => v.toString()),
      hexpand: false,
      visibility: true
    }).on("focus-out-event", (self) => {
      changeAction ? changeAction(self) : wallhaven_default[field] = self.text;
    }),
    Widget.Label({
      className: "label",
      label
    })
  ]
});
var Root3 = Widget.Box({
  className: "wallpaper-settings",
  vertical: true,
  children: [
    Widget.Label({
      className: "title",
      label: "Settings"
    }),
    Widget.CenterBox({
      startWidget: Widget.Box({
        vertical: true,
        children: [
          Switch("general", "General"),
          Switch("anime", "Anime"),
          Switch("people", "People")
        ]
      }),
      endWidget: Widget.Box({
        vertical: true,
        children: [Switch("sfw", "SFW"), Switch("sketchy", "Sketchy"), Switch("nsfw", "NSFW")]
      })
    }),
    Input("Search Term", "search_term"),
    Input("Wallhaven API Key", "apikey"),
    Input("Wallhaven Username", "username"),
    Input("Wallhaven Collection", "collection"),
    Input("Duration of each wallpaper (in minutes)", "display_time", (self) => {
      const val = parseInt(self.text);
      if (!isNaN(val) && val > 0) {
        wallhaven_default.display_time = val;
      }
    }),
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

// nixos/modules/desktops/modules/ags/src/windows/wallpaper/WallpaperDetails.ts
import Gdk from "gi://Gdk";
var display = Gdk.Display.get_default();
var Separator = () => Widget.Separator({
  vertical: false,
  hpack: "center",
  className: "separator"
});
var Button = ({
  onClicked,
  label,
  className,
  ...props
}) => Widget.Button({
  onClicked,
  onHover: (button) => {
    const cursor = Gdk.Cursor.new_from_name(display, "pointer");
    button.window.set_cursor(cursor);
  },
  onHoverLost: (button) => {
    button.window.set_cursor(null);
  },
  child: Widget.Label({
    className: `tag ${className}`,
    label
  }),
  ...props
});
var Root4 = Widget.Box({
  className: "wallpaper-details",
  vertical: true,
  children: [
    Widget.Label({
      className: "title",
      label: "Details"
    }),
    Widget.Box({
      hpack: "center",
      children: [
        Button({
          className: "action",
          label: "Find Similar Wallpapers",
          onClicked: () => {
            wallhaven_default.search_term = `like:${wallhaven_default.json?.id}`;
            wallhaven_default.random();
          }
        })
      ]
    }),
    Widget.CenterBox({
      spacing: 32,
      startWidget: Widget.Box({
        vpack: "start",
        spacing: 32,
        vertical: true,
        children: [
          Widget.Box({
            children: [
              Widget.Label("Path: "),
              Widget.Label({
                className: "code",
                label: wallhaven_default.bind("path")
              })
            ]
          }),
          Widget.Box({
            children: [
              Widget.Label("# in stack: "),
              Widget.Label({
                className: "code",
                label: wallhaven_default.bind("remaining").as((v) => v.toString())
              })
            ]
          }),
          Widget.Label({
            vpack: "start",
            className: "code",
            label: wallhaven_default.bind("json").as((v) => v ? JSON.stringify(v, null, 2) : "-")
          })
        ]
      }),
      centerWidget: Separator(),
      endWidget: Widget.Box({
        className: "right-panel",
        vpack: "start",
        vertical: true,
        spacing: 32,
        children: [
          Widget.Label({
            className: "code",
            hpack: "start",
            label: wallhaven_default.bind("meta")
          }),
          Widget.FlowBox({
            vpack: "start"
            // @ts-expect-error
          }).hook(wallhaven_default, (self) => {
            self.foreach((child) => child.destroy());
            wallhaven_default.tags.forEach((tag) => {
              self.add(
                Button({
                  className: tag.purity,
                  label: tag.name,
                  onClicked: () => {
                    wallhaven_default.search_term = `id:${tag.id}`;
                    wallhaven_default.random();
                  }
                })
              );
            });
            self.show_all();
          }),
          Widget.Box({
            hpack: "center",
            spacing: 8,
            children: wallhaven_default.bind("json").as(
              (json) => json?.colors.map(
                (color) => Widget.Box({
                  className: "tag color-tile",
                  hpack: "center",
                  css: `background-color: ${color};`
                })
              )
            )
          })
        ]
      })
    }),
    Widget.Button({
      className: "button",
      onClicked: () => App.closeWindow("wallpaper-details-menu"),
      child: Widget.Label("Close")
    })
  ]
});
var WallpaperDetails = Widget.Window({
  setup() {
  },
  name: "wallpaper-details-menu",
  anchor: [],
  child: Root4,
  layer: "overlay",
  keymode: "exclusive",
  visible: false
}).keybind([], "Escape", () => App.closeWindow("wallpaper-details-menu")).hook(App, (self, name, visible) => {
  if (name === "wallpaper-details-menu") {
    self.visible = visible;
  }
});
var WallpaperDetails_default = WallpaperDetails;

// nixos/modules/desktops/modules/ags/src/windows/index.ts
var windows_default = [Bar_default, Calendar_default, PowerMenu_default, WallpaperSettings_default, WallpaperDetails_default];

// nixos/modules/desktops/modules/ags/src/config.ts
App.config({
  style: `${App.configDir}/styles.css`,
  windows: windows_default
});
