import BarGroup from '../BarGroup';
import BarWidget from '../BarWidget';

const Power = BarGroup({
  className: 'power',
  children: [
    BarWidget({
      onClicked: () => App.toggleWindow('power-menu'),
      child: Widget.Button({
        child: Widget.Label({
          className: 'icon large',
          label: '⏻',
        }),
      }),
    }),
  ],
});

export default Power;
