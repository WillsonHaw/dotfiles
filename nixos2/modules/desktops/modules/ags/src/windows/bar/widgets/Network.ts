const network = await Service.import('network');

const WifiIndicator = Widget.Icon({
  className: 'icon',
  icon: network.wifi.bind('icon_name'),
});

const WiredIndicator = Widget.Icon({
  className: 'icon',
  icon: network.wired.bind('icon_name'),
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
