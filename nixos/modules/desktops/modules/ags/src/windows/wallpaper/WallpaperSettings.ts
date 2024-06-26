import Entry from 'types/widgets/entry';
import wallpaper, { WallpaperService } from '../../services/wallhaven';
import { Binding } from 'types/service';

type WallpaperProps = typeof WallpaperService.prototype;
type PropsOfType<T, TType> = {
  [K in keyof T]: T[K] extends TType ? K : never;
}[keyof T];

const Switch = (prop: PropsOfType<WallpaperProps, boolean>, label: string) =>
  Widget.Box({
    children: [
      Widget.Switch({
        className: wallpaper.bind(prop).as((v) => (v ? 'active' : '')),
        active: wallpaper.bind(prop),
        onActivate: ({ active }) => (wallpaper[prop] = active),
      }),
      Widget.Label(label),
    ],
  });

const Input = (
  label: string,
  field: PropsOfType<WallpaperProps, string | number>,
  changeAction?: (self: Entry<unknown>) => void,
) =>
  Widget.Box({
    className: 'input',
    children: [
      Widget.Entry({
        className: 'entry',
        text: wallpaper.bind(field).as((v) => v.toString()),
        hexpand: false,
        visibility: true,
      }).on('focus-out-event', (self) => {
        // @ts-expect-error
        changeAction ? changeAction(self) : (wallpaper[field] = self.text);
      }),
      Widget.Label({
        className: 'label',
        label,
      }),
    ],
  });

/**
 * engine commands:
 * screen = hyprctl monitors -j | jq '.[] | select(.focused) | .name'
 * linux-wallpaperengine --screen-root $screen --silent --assets-dir /run/media/slumpy/Games/SteamLibrary/steamapps/common/wallpaper_engine/assets /run/media/slumpy/Games/SteamLibrary/steamapps/workshop/content/431960/3009275235
 * linux-wallpaperengine --screen-root $screen --silent --assets-dir /run/media/slumpy/Games/SteamLibrary/steamapps/common/wallpaper_engine/assets /run/media/slumpy/Games/SteamLibrary/steamapps/workshop/content/431960/2195930369
 */
const Root = Widget.Box({
  className: 'wallpaper-settings',
  vertical: true,
  children: [
    Widget.Label({
      className: 'title',
      label: 'Settings',
    }),
    Widget.CenterBox({
      startWidget: Widget.Box({
        vertical: true,
        children: [
          Switch('general', 'General'),
          Switch('anime', 'Anime'),
          Switch('people', 'People'),
        ],
      }),
      endWidget: Widget.Box({
        vertical: true,
        children: [Switch('sfw', 'SFW'), Switch('sketchy', 'Sketchy'), Switch('nsfw', 'NSFW')],
      }),
    }),
    Input('Search Term', 'search_term'),
    Input('Wallhaven API Key', 'apikey'),
    Input('Wallhaven Username', 'username'),
    Input('Wallhaven Collection', 'collection'),
    Input('Duration of each wallpaper (in minutes)', 'display_time', (self) => {
      // @ts-expect-error
      const val = parseInt(self.text);

      if (!isNaN(val) && val > 0) {
        wallpaper.display_time = val;
      }
    }),
    Widget.Button({
      className: 'button',
      onClicked: () => App.closeWindow('wallpaper-settings-menu'),
      child: Widget.Label('Close'),
    }),
  ],
});

const WallpaperSettings = Widget.Window({
  name: 'wallpaper-settings-menu',
  anchor: [],
  child: Root,
  layer: 'overlay',
  keymode: 'exclusive',
  visible: false,
})
  // @ts-expect-error
  .keybind([], 'Escape', () => App.closeWindow('wallpaper-settings-menu'))
  // @ts-expect-error
  .hook(App, (self, name, visible) => {
    if (name === 'wallpaper-settings-menu') {
      // @ts-expect-error
      self.visible = visible;
    }
  });

export default WallpaperSettings;
