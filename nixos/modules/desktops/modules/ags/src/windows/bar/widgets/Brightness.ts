import brightness from '../../../services/brightness';

const showBar = Variable(false);

const Brightness = Widget.EventBox({
  className: 'widget brightness',
  onHover: () => showBar.setValue(brightness.has_interface),
  onHoverLost: () => showBar.setValue(false),
  child: Widget.Box({
    vertical: true,
    children: [
      Widget.Revealer({
        className: 'bar',
        revealChild: showBar.bind(),
        transition: 'slide_up',
        child: Widget.Slider({
          onChange: ({ value }) => (brightness.screen_value = value),
          vertical: true,
          inverted: true,
          value: brightness.bind('screen_value'),
          min: 0,
          max: 1,
          marks: [],
        }),
      }),
      Widget.CircularProgress({
        className: `circular-progress`,
        rounded: true,
        child: Widget.Label({
          className: `icon ${brightness.has_interface ? 'large' : 'medium'}`,
          label: brightness.has_interface ? '󰛨' : '󰹏',
        }),
        value: brightness.bind('screen_value').as((v) => (brightness.has_interface ? v : 1)),
      }),
    ],
  }),
});

export default Brightness;
