import BarWidget from '../BarWidget';

const battery = await Service.import('battery');

const Battery = BarWidget({
  className: 'battery',
  child: Widget.CircularProgress({
    className: `circular-progress`,
    visible: battery.bind('available'),
    rounded: true,
    child: Widget.Icon({
      className: 'icon',
      icon: battery.bind('icon_name'),
    }),
    value: battery.bind('percent').as((p) => p / 100),
  }),
});

export default Battery;
