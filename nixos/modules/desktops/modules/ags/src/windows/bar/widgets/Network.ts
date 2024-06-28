import BarWidget from '../BarWidget';

const network = await Service.import('network');

function getIcon() {
  if (network.primary === 'wired') {
    return '';
  }

  return network.wifi.bind('strength').as((v) => {
    const percent = v / 100;

    if (percent > 0.8) {
      return '󰤨';
    } else if (percent > 0.6) {
      return '󰤥';
    } else if (percent > 0.4) {
      return '󰤢';
    } else if (percent > 0.2) {
      return '󰤟';
    } else {
      return '󰤯';
    }
  });
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
    child: Widget.Label({
      className: 'icon medium',
      label: getIcon(),
    }),
    value: getStrength(),
    tooltipText: getTooltip(),
  }),
});

export default Network;
