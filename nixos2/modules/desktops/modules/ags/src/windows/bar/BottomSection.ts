import BarGroup from './BarGroup';
import Battery from './widgets/Battery';
import Brightness from './widgets/Brightness';
import Clock from './widgets/Clock';
import Network from './widgets/Network';
import SystemTray from './widgets/SystemTray';
import Volume from './widgets/Volume';

const ControlsGroup = BarGroup({
  className: 'controls',
  children: [Network, Battery, Brightness, Volume],
});

const BottomSection = Widget.Box({
  className: 'section bottom',
  vertical: true,
  vpack: 'end',
  children: [SystemTray, ControlsGroup, Clock],
});

export default BottomSection;
