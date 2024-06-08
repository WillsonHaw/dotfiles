import { Binding } from 'types/service';

const BarGroup = ({
  className,
  ...props
}: {
  children: any[] | Binding<any, any>;
  className?: string;
}) =>
  Widget.Box({
    className: `group ${className}`,
    vertical: true,
    ...props,
  });

export default BarGroup;
