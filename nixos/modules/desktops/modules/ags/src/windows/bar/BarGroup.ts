import { Binding } from 'types/service';

const BarGroup = ({
  className,
  spacing = 0,
  ...props
}: {
  children: any[] | Binding<any, any>;
  spacing?: number;
  visible?: boolean | Binding<any, any>;
  className?: string;
}) =>
  Widget.Box({
    className: `group ${className}`,
    spacing,
    vertical: true,
    ...props,
  });

export default BarGroup;
