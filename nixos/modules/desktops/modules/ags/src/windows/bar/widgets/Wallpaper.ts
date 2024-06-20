import wallpaper from '../../../services/wallpaper';
import BarGroup from '../BarGroup';
import BarWidget from '../BarWidget';

const RightClickMenu = Widget.Menu({
  children: [
    Widget.MenuItem({
      onActivate: () => App.openWindow('wallpaper-settings-menu'),
      child: Widget.Label('Settings'),
    }),
  ],
});

const Wallpaper = BarGroup({
  className: 'wallpaper',
  children: [
    BarWidget({
      onClicked: () => wallpaper.random(),
      // @ts-expect-error
      onSecondaryClickRelease: (_, event) => RightClickMenu.popup_at_pointer(event),
      child: Widget.Button({
        child: Widget.Label({
          className: 'icon large',
          label: '󰸉',
        }),
      }),
    }),
  ],
});

export default Wallpaper;
