import { Accessor } from "ags"
import Gtk from "gi://Gtk?version=4.0"

interface BarGroupProps {
  className?: string
  spacing?: number
  visible?: boolean | Accessor<boolean>
  children?: JSX.Element | JSX.Element[]
}

export default function BarGroup({ className, spacing = 0, children, ...props }: BarGroupProps) {
  return (
    <box class={`group ${className ?? ""}`} spacing={spacing} orientation={Gtk.Orientation.VERTICAL} {...props}>
      {children}
    </box>
  )
}
