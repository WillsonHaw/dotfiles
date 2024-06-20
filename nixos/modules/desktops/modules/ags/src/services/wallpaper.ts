import Gio from 'gi://Gio';

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
      },
    );
  }

  private _wallpapers: Map<string, WallpaperFolder> = new Map();
  private _currentWallpaper: string | null = null;
  private _monitors: Gio.FileMonitor[] = [];

  get folders() {
    return Array.from(this._wallpapers.values());
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
  }

  #loadFiles(folder: string) {
    const files = Utils.exec(`ls -A1 ${folder}`);

    return files.split('\n').map((file) => `${folder}/${file}`);
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

    print(`[Wallpaper] Getting random wallpaper from one of: ${enabledFolders.join(', ')}`);

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

      Utils.exec(`swww img --resize fit ${nextWallpaper}`);
    }
  }
}

// TODO: .config file
const wallpaper = new WallpaperService(
  '/home/slumpy/Wallpapers/sfw',
  '/home/slumpy/Wallpapers/nsfw',
);

export default wallpaper;
