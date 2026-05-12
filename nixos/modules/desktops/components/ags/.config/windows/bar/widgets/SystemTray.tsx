import { createBinding, For } from "ags"
import AstalTray from "gi://AstalTray"
import BarGroup from "../BarGroup"

const tray = AstalTray.get_default()
const items = createBinding(tray, "items")

function TrayItem({ item }: { item: AstalTray.TrayItem }) {
  return (
    <button
      class="widget"
      tooltipMarkup={createBinding(item, "tooltipMarkup")}
      onClicked={() => item.activate(0, 0)}
      onClickRelease={(self: any, event: any) => {
        if (event.button === 3) {
          const menu = item.create_menu()
          if (menu) {
            menu.popup_at_pointer(event)
          }
        }
      }}
    >
      <icon gIcon={createBinding(item, "gicon")} class="icon large" />
    </button>
  )
}

export default function SystemTray() {
  const visible = createBinding(tray, "items").as((i: AstalTray.TrayItem[]) => i.length > 0)

  return (
    <BarGroup className="system-tray" spacing={8} visible={visible}>
      <For each={items}>
        {(item: AstalTray.TrayItem) => <TrayItem item={item} />}
      </For>
    </BarGroup>
  )
}
