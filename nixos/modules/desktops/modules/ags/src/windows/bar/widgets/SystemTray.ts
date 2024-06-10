import { TrayItem } from 'types/service/systemtray';
import BarGroup from '../BarGroup';

const systemtray = await Service.import('systemtray');

const SystemTrayItem = (item: TrayItem) =>
  Widget.Button({
    className: 'widget',
    // @ts-expect-error
    child: Widget.Icon({ className: 'icon large' }).bind('icon', item, 'icon'),
    tooltipMarkup: item.bind('tooltip_markup'),
    onPrimaryClick: (_, event) => item.activate(event),
    onSecondaryClick: (_, event) => item.openMenu(event),
  });

const SystemTray = BarGroup({
  className: 'system-tray',
  visible: false,
  // visible: systemtray.bind('items').as((i) => console.log(systemtray.items.length) || i.length > 0),
  children: systemtray.bind('items').as((i) => i.map(SystemTrayItem)),
});

export default SystemTray;
