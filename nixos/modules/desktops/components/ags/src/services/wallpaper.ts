import Gio from 'gi://Gio';
import GLib from '../types/@girs/glib-2.0/glib-2.0';

// change wallpaper every 5 minutes
const DEFAULT_TRANSITION_TIME = 1000 * 60 * 5;

interface WallpaperFolder {
  path: string;
  enabled: boolean;
  wallpapers: string[];
}

/**
 * engine commands:
 * screen = hyprctl monitors -j | jq '.[] | select(.focused) | .name'
 * linux-wallpaperengine --screen-root $screen --silent --assets-dir /run/media/slumpy/Games/SteamLibrary/steamapps/common/wallpaper_engine/assets /run/media/slumpy/Games/SteamLibrary/steamapps/workshop/content/431960/3009275235
 * linux-wallpaperengine --screen-root $screen --silent --assets-dir /run/media/slumpy/Games/SteamLibrary/steamapps/common/wallpaper_engine/assets /run/media/slumpy/Games/SteamLibrary/steamapps/workshop/content/431960/2195930369
 */
class WallpaperService extends Service {
  static {
    Service.register(
      this,
      {},
      {
        folders: ['jsobject', 'r'],
        displayTime: ['int', 'rw'],
      },
    );
  }

  private _wallpapers: Map<string, WallpaperFolder> = new Map();
  private _currentWallpaper: string | null = null;
  private _monitors: Gio.FileMonitor[] = [];
  private _timer: GLib.Source | null = null;
  private _displayTime = DEFAULT_TRANSITION_TIME;

  get folders() {
    return Array.from(this._wallpapers.values());
  }

  get displayTime() {
    return this._displayTime;
  }

  set displayTime(v: number) {
    if (v < 1000) {
      print('[Wallpaper] Display time set too low!');
      this._displayTime = 1000;
    } else {
      this._displayTime = v;
    }

    this.#startTimer();
  }

  constructor(...wallpaperFolders: string[]) {
    super();

    wallpaperFolders.forEach((wallpaperFolder) => {
      const getWallpapers = () => {
        this._wallpapers.set(wallpaperFolder, {
          path: wallpaperFolder,
          enabled: true,
          wallpapers: this.#loadFiles(wallpaperFolder),
        });
      };

      this._monitors.push(
        Utils.monitorFile(wallpaperFolder, () => {
          print(`[Wallpaper] Wallpapers in ${wallpaperFolder} changed. Reloading folder.`);
          getWallpapers();
        }),
      );

      getWallpapers();
    });

    this._currentWallpaper = Utils.exec(`swww query`).split(': ').pop() ?? null;

    print('[Wallpaper] Current wallpaper:', this._currentWallpaper);

    print('[Wallpaper] Starting timer');

    this._timer = setTimeout(() => {
      this.random();
    }, DEFAULT_TRANSITION_TIME);
  }

  #loadFiles(folder: string) {
    const files = Utils.exec(`ls -A1 ${folder}`);

    return files.split('\n').map((file) => `${folder}/${file}`);
  }

  #startTimer() {
    if (this._timer) {
      this._timer.destroy();
    }

    this._timer = setTimeout(() => this.random(), this._displayTime);
  }

  enableFolder(folderPath: string) {
    print(`[Wallpaper] Enabling folder ${folderPath}`);
    const folder = this._wallpapers.get(folderPath);

    if (folder) {
      folder.enabled = true;
    }
  }

  disableFolder(folderPath: string) {
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
      ([_, folder]) => folder.enabled,
    );

    print(
      `[Wallpaper] Getting random wallpaper from one of: ${enabledFolders
        .map(([f]) => f)
        .join(', ')}`,
    );

    if (enabledFolders.length === 0) {
      return;
    }

    const folderIndex = Math.floor(enabledFolders.length * Math.random());
    const wallpapers = enabledFolders[folderIndex][1].wallpapers;
    const fileIndex = Math.floor(wallpapers.length * Math.random());
    const nextWallpaper = wallpapers[fileIndex];

    print(`[Wallpaper] Requesting next wallpaper: ${nextWallpaper}`);

    if (
      nextWallpaper === this._currentWallpaper &&
      (this._wallpapers.size > 1 || wallpapers.length > 1)
    ) {
      print(`[Wallpaper] Wallpaper is the same as the current one. Getting a new one.`);
      this.random();
    } else {
      this._currentWallpaper = nextWallpaper;

      Utils.exec(`swww img --resize fit -t random ${nextWallpaper}`);

      this.#startTimer();
    }
  }
}

// TODO: .config file
const wallpaper = new WallpaperService(
  '/home/slumpy/Wallpapers/sfw',
  '/home/slumpy/Wallpapers/nsfw',
);

export default wallpaper;
