import { createBinding, createComputed } from "ags"
import AstalHyprland from "gi://AstalHyprland"
import BarGroup from "../BarGroup"
import BarWidget from "../BarWidget"

const hyprland = AstalHyprland.get_default()

function dispatch(ws: number) {
  hyprland.dispatch("workspace", ws.toString())
}

function WorkspaceButton({ id }: { id: number }) {
  const focusedId = createBinding(hyprland.focusedWorkspace, "id")
  const isActive = createComputed(() => focusedId() === id)

  const workspaces = createBinding(hyprland, "workspaces")
  const isOccupied = createComputed(() => {
    const ws = workspaces().find((w: AstalHyprland.Workspace) => w.id === id)
    return ws ? ws.get_clients().length > 0 : false
  })

  const label = createComputed(() => (isActive() ? "\u{F0444}" : "\u{F04C3}"))
  const cls = createComputed(() => {
    let c = `workspace ws-${id}`
    if (isActive()) c += " active"
    if (isOccupied()) c += " occupied"
    return c
  })

  return (
    <BarWidget className={cls} onClicked={() => dispatch(id)}>
      <label label={label} />
    </BarWidget>
  )
}

export default function Workspaces() {
  return (
    <BarGroup className="workspaces">
      {Array.from({ length: 5 }, (_, i) => (
        <WorkspaceButton id={i + 1} />
      ))}
    </BarGroup>
  )
}
