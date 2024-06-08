import { Connectable } from 'types/service';
import BarGroup from '../BarGroup';
import BarWidget from '../BarWidget';
import { Hyprland } from 'types/service/hyprland';

const hyprland = (await Service.import('hyprland')) as unknown as Hyprland & Connectable;

const dispatch = (ws: number) => hyprland.messageAsync(`dispatch workspace ${ws}`);

const Workspaces = BarGroup({
  className: 'workspaces',
  children: Array.from({ length: 5 }, (_, i) => i + 1).map((id) =>
    BarWidget({
      setup: (self) => {
        self.hook(hyprland, () => {
          self.toggleClassName('active', hyprland.active.workspace.id === id);
          self.toggleClassName(
            'occupied',
            (hyprland.workspaces.find((w) => w.id === id)?.windows ?? 0) > 0,
          );
        });
      },
      className: `workspace ws-${id}`,
      onClicked: () => dispatch(id),
      child: Widget.Label({
        setup: (self) => {
          self.bind('label', hyprland.active.workspace as any, 'id', (ws) =>
            ws === id ? '' : '',
          );
        },
      }),
    }),
  ),
});

export default Workspaces;
