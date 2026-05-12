import { Astal } from "ags/gtk3"
import Gtk from "gi://Gtk?version=3.0"
import Gdk from "gi://Gdk?version=3.0"
import app from "ags/gtk3/app"
import { createComputed, For } from "ags"
import wallpaper from "../../services/wallhaven"

const display = Gdk.Display.get_default()

function TagButton({ className, label, onClicked }: { className: string; label: string; onClicked: () => void }) {
  return (
    <button
      onClicked={onClicked}
      onHover={(button: any) => {
        const cursor = Gdk.Cursor.new_from_name(display!, "pointer")
        button.window?.set_cursor(cursor)
      }}
      onHoverLost={(button: any) => {
        button.window?.set_cursor(null)
      }}
    >
      <label class={`tag ${className}`} label={label} />
    </button>
  )
}

export default function WallpaperDetails() {
  const remainingStr = createComputed(() => wallpaper.remaining().toString())
  const jsonStr = createComputed(() => {
    const j = wallpaper.json()
    return j ? JSON.stringify(j, null, 2) : "-"
  })

  const colors = createComputed(() => {
    const j = wallpaper.json()
    return j?.colors ?? []
  })

  return (
    <window
      name="wallpaper-details-menu"
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={app}
      visible={false}
      onKeyPressEvent={(self: any, event: Gdk.EventKey) => {
        const [, keyval] = event.get_keyval()
        if (keyval === Gdk.KEY_Escape) self.visible = false
      }}
    >
      <box class="wallpaper-details" vertical>
        <label class="title" label="Details" />
        <box halign={Gtk.Align.CENTER}>
          <TagButton
            className="action"
            label="Find Similar Wallpapers"
            onClicked={() => {
              const j = wallpaper.json()
              if (j) {
                wallpaper.setSearchTerm(`like:${j.id}`)
                wallpaper.random()
              }
            }}
          />
        </box>
        <centerbox
          startWidget={
            <box valign={Gtk.Align.START} spacing={32} vertical>
              <box>
                <label label="Path: " />
                <label class="code" label={wallpaper.path} />
              </box>
              <box>
                <label label="# in stack: " />
                <label class="code" label={remainingStr} />
              </box>
              <label valign={Gtk.Align.START} class="code" label={jsonStr} />
            </box>
          }
          centerWidget={
            <Gtk.Separator orientation={Gtk.Orientation.HORIZONTAL} halign={Gtk.Align.CENTER} className="separator" />
          }
          endWidget={
            <box class="right-panel" valign={Gtk.Align.START} vertical spacing={32}>
              <label class="code" halign={Gtk.Align.START} label={wallpaper.meta} />
              <box vertical valign={Gtk.Align.START}>
                <For each={wallpaper.tags}>
                  {(tag: any) => (
                    <TagButton
                      className={tag.purity}
                      label={tag.name}
                      onClicked={() => {
                        wallpaper.setSearchTerm(`id:${tag.id}`)
                        wallpaper.random()
                      }}
                    />
                  )}
                </For>
              </box>
              <box halign={Gtk.Align.CENTER} spacing={8}>
                <For each={colors}>
                  {(color: string) => (
                    <box class="tag color-tile" halign={Gtk.Align.CENTER} css={`background-color: ${color};`} />
                  )}
                </For>
              </box>
            </box>
          }
        />
        <button class="button" onClicked={() => { const w = app.get_window("wallpaper-details-menu"); if (w) w.visible = false }}>
          <label label="Close" />
        </button>
      </box>
    </window>
  )
}
