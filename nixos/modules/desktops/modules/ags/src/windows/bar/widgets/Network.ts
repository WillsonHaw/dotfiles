import BarWidget from '../BarWidget';

const network = await Service.import('network');

function getIcon() {
  return network.primary === 'wired'
    ? network.wired.bind('icon_name')
    : network.wifi.bind('icon_name');
}

function getStrength() {
  return network.primary === 'wired' ? 1 : network.wifi.bind('strength').as((v) => v / 100);
}

function getTooltip() {
  return network.primary === 'wired'
    ? 'Connect via Ethernet'
    : network.wifi.bind('ssid').as((v) => `Connected to ${v}`);
}

const Network = BarWidget({
  className: 'network',
  child: Widget.CircularProgress({
    className: `circular-progress`,
    rounded: true,
    child: Widget.Icon({
      className: 'icon',
      icon: getIcon(),
    }),
    value: getStrength(),
    tooltipText: getTooltip(),
  }),
});

export default Network;
