import { Accessor } from "ags"

interface BarGroupProps {
  className?: string
  spacing?: number
  visible?: boolean | Accessor<boolean>
  children?: JSX.Element | JSX.Element[]
}

export default function BarGroup({ className, spacing = 0, children, ...props }: BarGroupProps) {
  return (
    <box class={`group ${className ?? ""}`} spacing={spacing} vertical {...props}>
      {children}
    </box>
  )
}
