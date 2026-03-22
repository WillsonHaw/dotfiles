import type { ButtonProps } from 'types/widgets/button';

const BarWidget = ({ className, ...props }: ButtonProps) =>
  Widget.Button({
    className: `widget ${className}`,
    ...props,
  });

export default BarWidget;
