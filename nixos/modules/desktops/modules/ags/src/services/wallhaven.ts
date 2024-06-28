import Gio from 'gi://Gio';
import GLib from '../types/@girs/glib-2.0/glib-2.0';

// change wallpaper every 5 minutes
const DEFAULT_TRANSITION_TIME = 1000 * 60 * 5;
const ROOT_URL = 'https://wallhaven.cc/api/v1';

enum Categories {
  General = 0,
  Anime,
  People,
}

enum Purities {
  SFW = 0,
  Sketchy,
  NSFW,
}

interface Wallpaper {
  id: string;
  url: string;
  short_url: string;
  path: string;
  purity: string;
}

interface Tag {
  id: number;
  name: string;
  alias: string;
  category_id: number;
  category: string;
  purity: string;
  created_at: string;
}

interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  query: string | { id: number; tag: string } | null;
  seed: string | null;
}

export class WallpaperService extends Service {
  static {
    Service.register(
      this,
      {},
      {
        general: ['boolean', 'rw'],
        anime: ['boolean', 'rw'],
        people: ['boolean', 'rw'],
        sfw: ['boolean', 'rw'],
        sketchy: ['boolean', 'rw'],
        nsfw: ['boolean', 'rw'],
        collection: ['string', 'rw'],
        username: ['string', 'rw'],
        'search-term': ['string', 'rw'],
        apikey: ['string', 'rw'],
        'display-time': ['int', 'rw'],
        path: ['string', 'r'],
        remaining: ['int', 'r'],
        json: ['gobject', 'r'],
        tags: ['gobject', 'r'],
        meta: ['gobject', 'r'],
      },
    );
  }

  #category = '111';
  #purity = '111';
  #apikey = '';
  #collection = '';
  #searchTerm = '';
  #username = '';
  #displayTime = DEFAULT_TRANSITION_TIME;

  #wallpapers: Wallpaper[] = [];
  #configFile: string;
  #wallpaperFolder: string;
  #timer: GLib.Source | null = null;
  #currentWallpaper: [string, Wallpaper] | null = null;
  #tags: Tag[] = [];
  #meta: Meta | null = null;
  #getSaveFolder: (wallpaper: Wallpaper) => string;

  get path() {
    return this.#currentWallpaper?.[0] ?? '-';
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
    return this.#meta ? JSON.stringify(this.#meta, null, 2) : 'Missing Metadata';
  }

  get general() {
    return this.#category[Categories.General] === '1';
  }

  set general(v: boolean) {
    this.#setCategory(Categories.General, v);
  }

  get anime() {
    return this.#category[Categories.Anime] === '1';
  }

  set anime(v: boolean) {
    this.#setCategory(Categories.Anime, v);
  }

  get people() {
    return this.#category[Categories.People] === '1';
  }

  set people(v: boolean) {
    this.#setCategory(Categories.People, v);
  }

  get sfw() {
    return this.#purity[Purities.SFW] === '1';
  }

  set sfw(v: boolean) {
    this.#setPurity(Purities.SFW, v);
  }

  get sketchy() {
    return this.#purity[Purities.Sketchy] === '1';
  }

  set sketchy(v: boolean) {
    this.#setPurity(Purities.Sketchy, v);
  }

  get nsfw() {
    return this.#purity[Purities.NSFW] === '1';
  }

  set nsfw(v: boolean) {
    this.#setPurity(Purities.NSFW, v);
  }

  get collection() {
    return this.#collection;
  }

  set collection(v: string) {
    this.#collection = v;
    this.#onChange('collection');
  }

  get username() {
    return this.#username;
  }

  set username(v: string) {
    this.#username = v;
    this.#onChange('username');
  }

  get search_term() {
    return this.#searchTerm;
  }

  set search_term(v: string) {
    this.#searchTerm = v;
    this.#onChange('search-term');
  }

  get apikey() {
    return this.#apikey;
  }

  set apikey(v: string) {
    this.#apikey = v;
    this.#onChange('apikey');
  }

  get display_time() {
    return this.#displayTime / 60000;
  }

  set display_time(v: number) {
    this.#displayTime = v * 60000;
    this.#onChange('display-time');
  }

  constructor(
    configFile: string,
    wallpaperFolder = '/tmp/wallpapers',
    getSaveFolder: (wallpaper: Wallpaper) => string,
  ) {
    super();

    // Create all folders
    Utils.exec(`mkdir -p ${wallpaperFolder}`);
    ['sfw', 'sketchy', 'nsfw'].forEach((purity) => {
      Utils.exec(
        `mkdir -p ${getSaveFolder({
          id: '0',
          path: 'https://picsum.photos/300/200',
          purity,
          short_url: 'https://picsum.photos/300/200',
          url: 'https://picsum.photos/300/200',
        })}`,
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

      const wallpaper = this.#wallpapers.shift();

      if (!wallpaper) {
        console.error('[Wallpaper] Could not fetch wallpapers');
        return;
      }

      const fileName = `${this.#wallpaperFolder}/${wallpaper.path.split('/').pop()}`;

      print(`[Wallpaper] Downloading wallpaper: ${wallpaper.path} to ${fileName}...`);
      const response = await Utils.execAsync(`curl -o ${fileName} ${wallpaper.path}`);

      if (response) {
        print(`[Wallpaper] curl: ${response}`);
      }

      print(`[Wallpaper] Switching wallpaper to: ${fileName}`);
      const result = Utils.exec(`swww img --resize fit -t random ${fileName}`);

      if (result) {
        print(`[Wallpaper] swww: ${result}`);
      }

      this.#currentWallpaper = [fileName, wallpaper];

      const tags = await this.#getTags(wallpaper.id);

      this.#tags = tags;

      print(`[Wallpaper] ID: ${wallpaper.id}`);
      print(`[Wallpaper] Tags: ${tags.map((t) => t.name).join(', ')}`);

      this.#onChange(['json', 'path', 'tags', 'remaining'], false);
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

    const wallpaper = this.#currentWallpaper[1];
    const saveTo = this.#getSaveFolder(wallpaper);

    print(`[Wallpaper] Saving current wallpaper to: ${saveTo}/${wallpaper.path.split('/').pop()}`);

    const result = Utils.exec(`cp ${this.#currentWallpaper[0]} ${saveTo}`);

    if (result) {
      print(`[Wallpaper] cp: ${result}`);
    }
  }

  async #getTags(id: string) {
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

      print('[Wallpaper] Request:', url);
      const response = await Utils.fetch(url);
      const searchResult = await response.json();
      const { current_page, last_page } = searchResult.meta;

      print(
        `[Wallpaper] Received ${searchResult.data.length} wallpapers, ${current_page}/${last_page} pages`,
      );
      this.#wallpapers = searchResult.data;
      this.#meta = searchResult.meta;

      this.#onChange('meta', false);
    } catch (err) {
      console.error(err);
    }
  }

  #onChange(notify?: string | string[], reset = true) {
    // @ts-expect-error
    this.emit('changed');

    if (notify) {
      if (Array.isArray(notify)) {
        // @ts-expect-error
        notify.forEach((n) => this.notify(n));
      } else {
        // @ts-expect-error
        this.notify(notify);
      }
    }

    if (reset) {
      this.#wallpapers = [];
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
        print(`[Wallpaper] Error reading config file (${this.#configFile}):\n${err.message}`);
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
        meta: this.#meta,
      };

      Utils.writeFileSync(JSON.stringify(json, null, 2), this.#configFile);
    } catch (err) {
      if (err instanceof Error) {
        print(`[Wallpaper] Error writing config file (${this.#configFile}):\n${err.message}`);
      } else {
        print(`[Wallpaper] Error while writing config file: ${this.#configFile}\n${err}`);
      }
    }
  }

  #setCategory(flag: Categories, value: boolean) {
    const parts = this.#category.split('');

    parts[flag] = value ? '1' : '0';

    this.#category = parts.join('');
    this.#onChange(['general', 'anime', 'people']);
  }

  #setPurity(flag: Purities, value: boolean) {
    const parts = this.#purity.split('');

    parts[flag] = value ? '1' : '0';

    this.#purity = parts.join('');
    this.#onChange(['sfw', 'sketchy', 'nsfw']);
  }

  #getUrl() {
    const useCollection = !!(this.#collection && this.#username);
    const path = useCollection ? '/collections' : '/search';
    const params: Record<string, string> = {};

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
      params.sorting = 'random';
      params.seed = seed;
      params.atleast = '2560x1080';
      params.ratios = '16x9,16x10,32x9,4x1,64x27,256x135';

      if (this.#searchTerm) {
        params.q = this.#searchTerm;
      }
    }

    return `${ROOT_URL}${path}?${Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`;
  }
}

// TODO: .config file
const wallpaper = new WallpaperService(
  '/home/slumpy/.wallhaven.config',
  '/tmp/wallhaven-downloads',
  (wallpaper: Wallpaper) => {
    return `/home/slumpy/Wallpapers/${wallpaper.purity}`;
  },
);

export default wallpaper;
