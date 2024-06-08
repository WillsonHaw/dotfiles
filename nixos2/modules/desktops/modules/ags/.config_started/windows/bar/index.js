import Clock from './clock.js';

const root = Widget.Box({
  className: 'barbarbar',
  vertical: true,
  children: [Clock],
});

const Bar = Widget.Window({
  name: 'bar',
  anchor: ['top', 'left', 'bottom'],
  child: root,
  visible: true,
});

export default Bar;
