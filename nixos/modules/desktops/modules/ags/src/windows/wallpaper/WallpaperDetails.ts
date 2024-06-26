import wallpaper, { WallpaperService } from '../../services/wallhaven';

const Root = Widget.Box({
  className: 'wallpaper-details',
  vertical: true,
  children: [
    Widget.Label({
      className: 'title',
      label: 'Details',
    }),
    Widget.Box({
      children: [
        Widget.Label('Path: '),
        Widget.Label({
          className: 'code',
          label: wallpaper.bind('path'),
        }),
      ],
    }),
    Widget.Label({
      className: 'code',
      label: wallpaper.bind('json'),
    }),
    // @ts-expect-error
    Widget.FlowBox().hook(wallpaper, (self) => {
      // @ts-expect-error
      self.foreach((child) => child.destroy());

      wallpaper.tags.forEach((tag) => {
        // @ts-expect-error
        self.add(
          Widget.Button({
            onClicked: () => (wallpaper.search_term = `id:${tag.id}`),
            child: Widget.Label({
              className: `tag ${tag.purity}`,
              label: tag.name,
            }),
          }),
        );
      });

      // @ts-expect-error
      self.show_all();
    }),
    Widget.Button({
      className: 'button',
      onClicked: () => App.closeWindow('wallpaper-details-menu'),
      child: Widget.Label('Close'),
    }),
  ],
});

const WallpaperDetails = Widget.Window({
  setup() {},
  name: 'wallpaper-details-menu',
  anchor: [],
  child: Root,
  layer: 'overlay',
  keymode: 'exclusive',
  visible: false,
})
  // @ts-expect-error
  .keybind([], 'Escape', () => App.closeWindow('wallpaper-details-menu'))
  // @ts-expect-error
  .hook(App, (self, name, visible) => {
    if (name === 'wallpaper-details-menu') {
      // @ts-expect-error
      self.visible = visible;
    }
  });

export default WallpaperDetails;
