const network = await Service.import('network');

const WifiIndicator = Widget.CircularProgress({
  className: `widget circular-progress network`,
  rounded: true,
  child: Widget.Icon({
    className: 'icon',
    icon: network.wifi.bind('icon_name'),
  }),
  value: network.wifi.bind('strength').as((v) => v / 100),
  tooltipText: network.wifi.bind('ssid').as((v) => `Connected to ${v}`),
});

const WiredIndicator = Widget.CircularProgress({
  className: `circular-progress`,
  rounded: true,
  child: Widget.Icon({
    className: 'icon',
    icon: network.wired.bind('icon_name'),
  }),
  value: 1,
});

const Network = Widget.Stack({
  className: 'widget network',
  children: {
    wifi: WifiIndicator,
    wired: WiredIndicator,
  },
  shown: network.bind('primary').as((p) => p || 'wifi'),
});

export default Network;
