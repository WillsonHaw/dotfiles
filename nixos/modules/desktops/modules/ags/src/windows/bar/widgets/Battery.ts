import BarWidget from '../BarWidget';

const battery = await Service.import('battery');

const Battery = BarWidget({
  className: 'battery',
  child: battery.bind('available').as((available) =>
    available
      ? Widget.CircularProgress({
          className: `circular-progress`,
          visible: battery.bind('available'),
          rounded: true,
          child: Widget.Icon({
            className: 'icon',
            icon: battery.bind('icon_name'),
          }),
          tooltipText: battery.bind('percent').as((p) => `Battery: ${p}% Remaining`),
          value: battery.bind('percent').as((p) => p / 100),
        })
      : Widget.CircularProgress({
          className: `circular-progress`,
          visible: battery.bind('available'),
          rounded: true,
          child: Widget.Label({
            className: 'icon medium',
            label: '',
          }),
          tooltipText: 'Plugged In',
          value: 1,
        }),
  ),
});

export default Battery;
