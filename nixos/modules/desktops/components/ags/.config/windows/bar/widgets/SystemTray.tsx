import { createBinding, For } from "ags"
import AstalTray from "gi://AstalTray"

const tray = AstalTray.get_default()
const items = createBinding(tray, "items")

function TrayItem({ item }: { item: AstalTray.TrayItem }) {
  return (
    <button
      class="tray-item"
      tooltipMarkup={createBinding(item, "tooltipMarkup")}
      onClicked={() => item.activate(0, 0)}
      onClickRelease={(self: any, event: any) => {
        if (event.button === 3) {
          const menu = (item as any).create_menu()
          if (menu) menu.popup_at_pointer(event)
        }
      }}
    >
      <icon gicon={createBinding(item, "gicon")} class="tray-icon" />
    </button>
  )
}

export default function SystemTray() {
  const visible = items.as((i: AstalTray.TrayItem[]) => i.length > 0)

  return (
    <box class="pill tray-pill" spacing={0} visible={visible}>
      <For each={items}>
        {(item: AstalTray.TrayItem) => <TrayItem item={item} />}
      </For>
    </box>
  )
}
