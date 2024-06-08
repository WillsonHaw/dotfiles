const WIDGET_HEIGHT = 32;
const WIDGET_WIDTH = 32;

const BarWidget = ({
  className,
  ...props
}: {
  setup?: (self: ReturnType<typeof Widget.Button>) => void;
  child: ReturnType<typeof Widget.Label>;
  className?: string;
  tooltipText?: string;
  onClicked?: () => void;
}) =>
  Widget.Button({
    className: `widget ${className}`,
    ...props,
  });

export default BarWidget;
