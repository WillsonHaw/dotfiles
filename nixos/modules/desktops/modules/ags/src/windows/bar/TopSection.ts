import Launcher from './widgets/Launcher';
import Workspaces from './widgets/Workspaces';

const TopSection = Widget.Box({
  className: 'section top',
  vertical: true,
  vpack: 'start',
  children: [Launcher, Workspaces],
});

export default TopSection;
