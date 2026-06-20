import { createBinding, For } from "ags"
import AstalTray from "gi://AstalTray"

const tray = AstalTray.get_default()
const items = createBinding(tray, "items")

function TrayItem({ item }: { item: AstalTray.TrayItem }) {
  return (
    <menubutton
      class="tray-item"
      tooltipMarkup={createBinding(item, "tooltipMarkup")}
      menuModel={createBinding(item, "menuModel")}
      $={(btn: any) => {
        btn.insert_action_group("dbusmenu", item.actionGroup)
      }}
    >
      <image gicon={createBinding(item, "gicon")} class="tray-icon" />
    </menubutton>
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
