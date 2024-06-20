import wallpaper from '../../services/wallpaper';

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
      label: 'Enable/Disable sources',
    }),
    ...wallpaper.folders.map((folder) =>
      Widget.Box({
        children: [
          Widget.Switch({
            className: folder.enabled ? 'active' : 'inactive',
            active: folder.enabled,
            onActivate: ({ active }) =>
              active ? wallpaper.enableFolder(folder.path) : wallpaper.disableFolder(folder.path),
          }),
          Widget.Label({
            label: folder.path,
          }),
        ],
      }),
    ),
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
