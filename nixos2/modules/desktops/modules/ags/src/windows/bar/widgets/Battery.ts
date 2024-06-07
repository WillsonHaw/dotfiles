const battery = await Service.import('battery');

const Battery = Widget.CircularProgress({
  className: `widget circular-progress battery`,
  visible: battery.bind('available'),
  rounded: true,
  child: Widget.Icon({
    className: 'icon',
    icon: battery.bind('icon_name'),
  }),
  value: battery.bind('percent').as((p) => p / 100),
});

export default Battery;
