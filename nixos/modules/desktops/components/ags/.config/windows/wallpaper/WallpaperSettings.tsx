import { createComputed } from "ags"
import { Astal } from "ags/gtk3"
import Gtk from "gi://Gtk?version=3.0"
import app from "ags/gtk3/app"
import wallpaper from "../../services/wallpaper"

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

function FolderToggle({ path, label }: { path: string; label: string }) {
  const enabled = createComputed(() =>
    wallpaper.folders().find(f => f.path === path)?.enabled ?? false,
  )

  return (
    <box spacing={10} halign={Gtk.Align.START}>
      <switch
        active={enabled}
        onActivate={(self: any) => {
          if (self.active) wallpaper.enableFolder(path)
          else wallpaper.disableFolder(path)
        }}
      />
      <label label={label} />
    </box>
  )
}

export default function WallpaperSettings() {
  function dismiss() {
    const w = app.get_window("wallpaper-settings-menu")
    if (w) w.visible = false
  }

  const minutesLabel = createComputed(() => `${wallpaper.getDisplayTimeMinutes()} min`)
  const currentLabel = createComputed(() => {
    const w = wallpaper.currentWallpaper()
    return w ? (w.split("/").pop() ?? "—") : "—"
  })

  return (
    <window
      name="wallpaper-settings-menu"
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={app}
      visible={false}
    >
      <eventbox onClickRelease={dismiss}>
        <box halign={Gtk.Align.CENTER} valign={Gtk.Align.START} marginTop={44}>
          <eventbox>
            <box class="wallpaper-popup" vertical spacing={16}>
              <label class="wp-popup-title" label="Wallpapers" />

              <box vertical spacing={8}>
                {wallpaper.folders().map(f => (
                  <FolderToggle path={f.path} label={f.label} />
                ))}
              </box>

              <box class="wp-popup-separator" />

              <box spacing={8} halign={Gtk.Align.CENTER}>
                <label label="Rotate every" />
                <button
                  class="wp-step-btn"
                  onClicked={() => wallpaper.setDisplayTimeMinutes(wallpaper.getDisplayTimeMinutes() - 1)}
                >
                  <label label="−" />
                </button>
                <label label={minutesLabel} />
                <button
                  class="wp-step-btn"
                  onClicked={() => wallpaper.setDisplayTimeMinutes(wallpaper.getDisplayTimeMinutes() + 1)}
                >
                  <label label="+" />
                </button>
              </box>

              <box class="wp-popup-separator" />

              <box vertical spacing={4}>
                <label class="wp-popup-current-label" label="Current" />
                <label class="wp-popup-current" label={currentLabel} />
              </box>

              <button class="wp-next-btn" onClicked={() => wallpaper.random()}>
                <label label="Next" />
              </button>
            </box>
          </eventbox>
        </box>
      </eventbox>
    </window>
  )
}
