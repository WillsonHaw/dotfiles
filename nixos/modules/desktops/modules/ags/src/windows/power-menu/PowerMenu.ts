const PowerAction = (icon: string, label: string, action: () => void) =>
  Widget.Button({
    className: 'power-action',
    onClicked: () => {
      action();
      App.toggleWindow('power-menu');
    },
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
    PowerAction('', 'Reload Hyprland', () => Utils.exec('hyprctl reload')),
    PowerAction('󰤄', 'Suspend', () =>
      Utils.exec('sleep 0.1 && systemctl suspend || loginctl suspend'),
    ),
    PowerAction('', 'Reboot', () => Utils.exec('reboot')),
    PowerAction('', 'Lock', () => Utils.exec('hyprlock')),
    PowerAction('󰍃', 'Logout', () => Utils.exec('wlogout')),
    PowerAction('⏻', 'Shutdown', () => Utils.exec('shutdown now')),
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
