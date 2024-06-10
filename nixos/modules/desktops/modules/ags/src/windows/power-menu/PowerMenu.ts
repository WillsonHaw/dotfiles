const PowerAction = (icon: string, label: string) =>
  Widget.Button({
    className: 'power-action',
    child: Widget.Box({
      vertical: true,
      children: [
        Widget.Label({
          className: 'icon x-large',
          label: icon,
        }),
        Widget.Label({
          className: 'label',
          label,
        }),
      ],
    }),
  });

const Root = Widget.Box({
  className: 'power-menu',
  children: [
    PowerAction('', 'Reload Hyprland'),
    PowerAction('󰤄', 'Suspend'),
    PowerAction('', 'Reboot'),
    PowerAction('', 'Lock'),
    PowerAction('󰍃', 'Logout'),
    PowerAction('⏻', 'Shutdown'),
  ],
});

const PowerMenu = Widget.Window({
  name: 'power-menu',
  anchor: [],
  child: Root,
  layer: 'overlay',
  keymode: 'exclusive',
  visible: false,
})
  // @ts-expect-error
  .keybind([], 'Escape', () => App.toggleWindow('power-menu'))
  // @ts-expect-error
  .hook(App, (self, _, visible) => {
    // @ts-expect-error
    self.visible = visible;
  });

export default PowerMenu;
