import BarGroup from '../BarGroup';
import BarWidget from '../BarWidget';

const Launcher = BarGroup({
  className: 'launcher',
  children: [
    BarWidget({
      onClicked: () => Utils.exec('/home/slumpy/.config/rofi/launchers/type-6/launcher.sh'),
      child: Widget.Label({ label: '' }),
    }),
  ],
});

export default Launcher;
