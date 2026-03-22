import Gdk from 'gi://Gdk';
import wallpaper from '../../services/wallhaven';
import { ButtonProps } from 'types/widgets/button';

const display = Gdk.Display.get_default();

const Separator = () =>
  Widget.Separator({
    vertical: false,
    hpack: 'center',
    className: 'separator',
  });

const Button = ({
  onClicked,
  label,
  className,
  ...props
}: {
  onClicked: () => void;
  label: string;
  className: string;
} & ButtonProps) =>
  Widget.Button({
    onClicked,
    onHover: (button) => {
      const cursor = Gdk.Cursor.new_from_name(display, 'pointer');

      button.window.set_cursor(cursor);
    },
    onHoverLost: (button) => {
      button.window.set_cursor(null);
    },
    child: Widget.Label({
      className: `tag ${className}`,
      label,
    }),
    ...props,
  });

const Root = Widget.Box({
  className: 'wallpaper-details',
  vertical: true,
  children: [
    Widget.Label({
      className: 'title',
      label: 'Details',
    }),
    Widget.Box({
      hpack: 'center',
      children: [
        Button({
          className: 'action',
          label: 'Find Similar Wallpapers',
          onClicked: () => {
            wallpaper.search_term = `like:${wallpaper.json?.id}`;
            wallpaper.random();
          },
        }),
      ],
    }),
    Widget.CenterBox({
      spacing: 32,
      startWidget: Widget.Box({
        vpack: 'start',
        spacing: 32,
        vertical: true,
        children: [
          Widget.Box({
            children: [
              Widget.Label('Path: '),
              Widget.Label({
                className: 'code',
                label: wallpaper.bind('path'),
              }),
            ],
          }),
          Widget.Box({
            children: [
              Widget.Label('# in stack: '),
              Widget.Label({
                className: 'code',
                label: wallpaper.bind('remaining').as((v) => v.toString()),
              }),
            ],
          }),
          Widget.Label({
            vpack: 'start',
            className: 'code',
            label: wallpaper.bind('json').as((v) => (v ? JSON.stringify(v, null, 2) : '-')),
          }),
        ],
      }),
      centerWidget: Separator(),
      endWidget: Widget.Box({
        className: 'right-panel',
        vpack: 'start',
        vertical: true,
        spacing: 32,
        children: [
          Widget.Label({
            className: 'code',
            hpack: 'start',
            label: wallpaper.bind('meta'),
          }),
          Widget.FlowBox({
            vpack: 'start',
            // @ts-expect-error
          }).hook(wallpaper, (self) => {
            // @ts-expect-error
            self.foreach((child) => child.destroy());

            wallpaper.tags.forEach((tag) => {
              // @ts-expect-error
              self.add(
                Button({
                  className: tag.purity,
                  label: tag.name,
                  onClicked: () => {
                    wallpaper.search_term = `id:${tag.id}`;
                    wallpaper.random();
                  },
                }),
              );
            });

            // @ts-expect-error
            self.show_all();
          }),
          Widget.Box({
            hpack: 'center',
            spacing: 8,
            children: wallpaper.bind('json').as((json) =>
              json?.colors.map((color) =>
                Widget.Box({
                  className: 'tag color-tile',
                  hpack: 'center',
                  css: `background-color: ${color};`,
                }),
              ),
            ),
          }),
        ],
      }),
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
