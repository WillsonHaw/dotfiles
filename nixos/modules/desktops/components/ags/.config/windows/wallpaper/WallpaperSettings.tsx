import { Accessor, createComputed, createState } from "ags"
import { timeout } from "ags/time"
import { Astal } from "ags/gtk3"
import Gtk from "gi://Gtk?version=3.0"
import Gdk from "gi://Gdk?version=3.0"
import app from "ags/gtk3/app"
import wallpaper from "../../services/wallpaper"

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

function Toggle({ label, active, onToggle }: { label: string; active: Accessor<boolean>; onToggle: (v: boolean) => void }) {
  return (
    <box spacing={8} halign={Gtk.Align.START}>
      <switch active={active} onStateSet={(_: any, state: boolean) => { onToggle(state) }} />
      <label label={label} />
    </box>
  )
}

function TextInput({ placeholder, value, onCommit }: {
  placeholder: string
  value: () => string
  onCommit: (v: string) => void
}) {
  let debounce: { cancel(): void } | null = null
  return (
    <entry
      class="wp-entry"
      placeholderText={placeholder}
      text={value()}
      hexpand
      onChanged={(self: any) => {
        if (debounce) debounce.cancel()
        debounce = timeout(3000, () => { debounce = null; onCommit(self.text) })
      }}
      onActivate={(self: any) => {
        if (debounce) { debounce.cancel(); debounce = null }
        onCommit(self.text)
      }}
    />
  )
}

export default function WallpaperSettings() {
  function dismiss() {
    const w = app.get_window("wallpaper-settings-menu")
    if (w) w.visible = false
  }

  const [saved, setSaved] = createState(false)
  const saveBtnLabel = createComputed(() => saved() ? "Saved!" : "Save")

  function save() {
    wallpaper.saveCurrentWallpaper()
    setSaved(true)
    timeout(2000, () => setSaved(false))
  }

  const minutesLabel = createComputed(() => `${Math.round(wallpaper.displayTime() / 60_000)} min`)

  const currentLabel = createComputed(() => {
    const w = wallpaper.currentWallpaper()
    if (!w) return "—"
    const name = w.path.split("/").pop() ?? "—"
    return `[${w.purity}] ${name}`
  })

  const nextBtnLabel = createComputed(() =>
    wallpaper.isDownloading() ? "Downloading…" :
    wallpaper.nextWallpaper() ? "Next ↓" : "Next",
  )

  const searchStatusLabel = createComputed(() => {
    const status = wallpaper.fetchStatus()
    const total = wallpaper.searchTotal()
    if (status === "idle") return ""
    if (status === "ok") return `${(total ?? 0).toLocaleString()} wallpapers found`
    if (status === "no-results") return "No results for this search"
    if (status === "offline") return "Offline — using local wallpapers"
    return "API error"
  })

  const searchStatusClass = createComputed(() => {
    const s = wallpaper.fetchStatus()
    if (s === "ok") return "wp-status wp-status-ok"
    if (s === "offline" || s === "api-error") return "wp-status wp-status-err"
    if (s === "no-results") return "wp-status wp-status-warn"
    return "wp-status"
  })

  const [debugOpen, setDebugOpen] = createState(false)

  const debugResponse = createComputed(() => {
    const raw = wallpaper.lastDebugResponse()
    if (!raw) return "—"
    try { return JSON.stringify(JSON.parse(raw), null, 2) } catch { return raw }
  })

  return (
    <window
      name="wallpaper-settings-menu"
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={app}
      visible={false}
      onKeyPressEvent={(_: any, event: Gdk.EventKey) => {
        if (event.keyval === Gdk.KEY_Escape) dismiss()
      }}
    >
      <eventbox onClickRelease={dismiss}>
        <box halign={Gtk.Align.CENTER} valign={Gtk.Align.START} marginTop={44}>
          <eventbox onButtonReleaseEvent={() => true}>
            <box class="wallpaper-popup" vertical spacing={14}>

              <label class="wp-popup-title" label="Wallpapers" halign={Gtk.Align.START} />

              {/* Purity flags */}
              <box vertical spacing={6}>
                <label class="wp-popup-current-label" label="Purity" halign={Gtk.Align.START} />
                <box spacing={16}>
                  <Toggle label="SFW" active={wallpaper.sfw} onToggle={wallpaper.setSfw} />
                  <Toggle label="Sketchy" active={wallpaper.sketchy} onToggle={wallpaper.setSketchy} />
                  <Toggle label="NSFW" active={wallpaper.nsfw} onToggle={wallpaper.setNsfw} />
                </box>
                <label class="wp-popup-current-label" label="Categories" halign={Gtk.Align.START} />
                <box spacing={16}>
                  <Toggle label="General" active={wallpaper.general} onToggle={wallpaper.setGeneral} />
                  <Toggle label="Anime" active={wallpaper.anime} onToggle={wallpaper.setAnime} />
                  <Toggle label="People" active={wallpaper.people} onToggle={wallpaper.setPeople} />
                </box>
              </box>

              {/* Tags */}
              <box vertical spacing={4}>
                <label class="wp-popup-current-label" label="Tags / Keywords" halign={Gtk.Align.START} />
                <TextInput placeholder="e.g. nature landscape" value={wallpaper.tags} onCommit={wallpaper.setTags} />
                <label
                  class={searchStatusClass}
                  label={searchStatusLabel}
                  halign={Gtk.Align.START}
                  visible={createComputed(() => wallpaper.fetchStatus() !== "idle")}
                />
              </box>

              <box class="wp-popup-separator" />

              {/* Local only + timer */}
              <Toggle label="Saved wallpapers only (no downloads)" active={wallpaper.localOnly} onToggle={wallpaper.setLocalOnly} />

              <box spacing={8} halign={Gtk.Align.START}>
                <label label="Rotate every" />
                <button class="wp-step-btn" onClicked={() => wallpaper.setDisplayTimeMinutes(wallpaper.getDisplayTimeMinutes() - 1)}>
                  <label label="−" />
                </button>
                <label label={minutesLabel} />
                <button class="wp-step-btn" onClicked={() => wallpaper.setDisplayTimeMinutes(wallpaper.getDisplayTimeMinutes() + 1)}>
                  <label label="+" />
                </button>
              </box>

              <box class="wp-popup-separator" />

              {/* Current + actions */}
              <box vertical spacing={6}>
                <label class="wp-popup-current-label" label="Current" halign={Gtk.Align.START} />
                <label class="wp-popup-current" label={currentLabel} halign={Gtk.Align.START} wrap />
                <box spacing={8} marginTop={4}>
                  <button class="wp-save-btn" onClicked={save}>
                    <label label={saveBtnLabel} />
                  </button>
                  <button
                    class="wp-next-btn"
                    sensitive={createComputed(() => !wallpaper.isDownloading())}
                    onClicked={() => wallpaper.random().catch(() => {})}
                  >
                    <label label={nextBtnLabel} />
                  </button>
                </box>
              </box>

              <box class="wp-popup-separator" />

              {/* API key */}
              <box vertical spacing={4}>
                <label class="wp-popup-current-label" label="Wallhaven API Key (required for NSFW)" halign={Gtk.Align.START} />
                <TextInput placeholder="your-api-key" value={wallpaper.apikey} onCommit={wallpaper.setApikey} />
              </box>

              <box class="wp-popup-separator" />

              {/* Debug panel */}
              <box vertical spacing={8}>
                <button
                  class="wp-debug-toggle"
                  onClicked={() => setDebugOpen(!debugOpen())}
                >
                  <label
                    halign={Gtk.Align.START}
                    label={createComputed(() => `${debugOpen() ? "▴" : "▾"} Debug`)}
                  />
                </button>
                <box
                  vertical
                  spacing={6}
                  visible={debugOpen}
                >
                  <label class="wp-popup-current-label" label="Request URL" halign={Gtk.Align.START} />
                  <label
                    class="wp-debug-url"
                    label={createComputed(() => wallpaper.lastDebugUrl() ?? "—")}
                    halign={Gtk.Align.START}
                    wrap
                    selectable
                  />
                  <label class="wp-popup-current-label" label="Response" halign={Gtk.Align.START} />
                  <scrollable class="wp-debug-scroll" vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC} hscrollbarPolicy={Gtk.PolicyType.NEVER}>
                    <label
                      class="wp-debug-response"
                      label={debugResponse}
                      halign={Gtk.Align.START}
                      valign={Gtk.Align.START}
                      selectable
                    />
                  </scrollable>
                </box>
              </box>

            </box>
          </eventbox>
        </box>
      </eventbox>
    </window>
  )
}
