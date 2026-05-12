interface BarWidgetProps {
  className?: string
  onClicked?: (self: any) => void
  children?: JSX.Element | JSX.Element[]
  [key: string]: any
}

export default function BarWidget({ className, children, ...props }: BarWidgetProps) {
  return (
    <button class={`widget ${className ?? ""}`} {...props}>
      {children}
    </button>
  )
}
