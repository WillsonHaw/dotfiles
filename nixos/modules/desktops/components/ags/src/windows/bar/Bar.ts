import TopSection from './TopSection';
import BottomSection from './BottomSection';

const root = Widget.CenterBox({
  className: 'bar-window',
  vertical: true,
  startWidget: TopSection,
  endWidget: BottomSection,
});

const Bar = Widget.Window({
  name: 'bar',
  anchor: ['top', 'left', 'bottom'],
  child: root,
  visible: true,
});

export default Bar;
