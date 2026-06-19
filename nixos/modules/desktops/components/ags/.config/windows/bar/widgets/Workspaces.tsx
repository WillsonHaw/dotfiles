import { createComputed, For } from "ags"
import { createPoll } from "ags/time"
import { execAsync } from "ags/process"

interface NiriWorkspace {
  id: number
  idx: number
  name: string | null
  output: string
  is_active: boolean
  is_focused: boolean
  active_window_id: number | null
}

const raw = createPoll("[]", 1000, async () => {
  try { return await execAsync("niri msg -j workspaces") }
  catch { return "[]" }
})

const workspaces = createComputed((): NiriWorkspace[] => {
  try {
    const ws: NiriWorkspace[] = JSON.parse(raw())
    if (ws.length === 0) return []
    ws.sort((a, b) => a.idx - b.idx)
    const maxIdx = ws[ws.length - 1].idx
    const byIdx = new Map(ws.map(w => [w.idx, w]))
    const result: NiriWorkspace[] = []
    for (let i = 1; i <= maxIdx; i++) {
      result.push(byIdx.get(i) ?? {
        id: -i, idx: i, name: null, output: "",
        is_active: false, is_focused: false, active_window_id: null,
      })
    }
    return result
  } catch { return [] }
})

function WorkspaceButton({ ws }: { ws: NiriWorkspace }) {
  const label = ws.is_focused ? "●" : ws.active_window_id !== null ? "◉" : "○"
  const cls = ["workspace-btn", ws.is_focused ? "active" : "", ws.active_window_id !== null ? "occupied" : ""]
    .filter(Boolean).join(" ")

  return (
    <button class={cls} onClicked={() => execAsync(`niri msg action focus-workspace ${ws.idx}`).catch(() => {})}>
      <label label={label} />
    </button>
  )
}

export default function Workspaces() {
  return (
    <box class="pill workspaces-pill" spacing={0}>
      <For each={workspaces}>
        {(ws: NiriWorkspace) => <WorkspaceButton ws={ws} />}
      </For>
    </box>
  )
}
