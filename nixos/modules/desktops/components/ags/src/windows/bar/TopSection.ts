import Launcher from './widgets/Launcher';
import Wallpaper from './widgets/Wallpaper';
import Workspaces from './widgets/Workspaces';

const TopSection = Widget.Box({
  className: 'section top',
  vertical: true,
  vpack: 'start',
  children: [Launcher, Wallpaper, Workspaces],
});

export default TopSection;
