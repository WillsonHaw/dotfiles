import Clock from './widgets/Clock';
import SystemTray from './widgets/SystemTray';

const BottomSection = Widget.Box({
  className: 'section bottom',
  vertical: true,
  vpack: 'end',
  // children: [SystrayGroup, ControlsGroup, ClockGroup, PowerGroup],
  children: [SystemTray, Clock],
});

export default BottomSection;
