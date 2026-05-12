import { Astal } from "ags/gtk3"
import Gdk from "gi://Gdk?version=3.0"
import app from "ags/gtk3/app"
import wallpaper from "../../services/wallhaven"

type BooleanKey = "general" | "anime" | "people" | "sfw" | "sketchy" | "nsfw" | "useImageFill" | "useClearColor" | "useExactResolution"

const setterMap: Record<BooleanKey, (v: boolean) => void> = {
  general: wallpaper.setGeneral,
  anime: wallpaper.setAnime,
  people: wallpaper.setPeople,
  sfw: wallpaper.setSfw,
  sketchy: wallpaper.setSketchy,
  nsfw: wallpaper.setNsfw,
  useImageFill: wallpaper.setUseImageFill,
  useClearColor: wallpaper.setUseClearColor,
  useExactResolution: wallpaper.setUseExactResolution,
}

function Toggle({ prop, label }: { prop: BooleanKey; label: string }) {
  const accessor = wallpaper[prop]
  const setter = setterMap[prop]

  return (
    <box>
      <switch
        active={accessor}
        onActivate={(self: any) => setter(self.active)}
      />
      <label label={label} />
    </box>
  )
}

function Input({ label, value, onChange }: { label: string; value: any; onChange: (text: string) => void }) {
  return (
    <box class="input">
      <entry
        class="entry"
        text={value}
        hexpand={false}
        visibility
        onFocusOutEvent={(self: any) => onChange(self.text)}
      />
      <label class="label" label={label} />
    </box>
  )
}

export default function WallpaperSettings() {
  return (
    <window
      name="wallpaper-settings-menu"
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={app}
      visible={false}
      onKeyPressEvent={(self: any, event: Gdk.EventKey) => {
        const [, keyval] = event.get_keyval()
        if (keyval === Gdk.KEY_Escape) self.visible = false
      }}
    >
      <box class="wallpaper-settings" vertical>
        <label class="title" label="Settings" />
        <centerbox
          startWidget={
            <box vertical>
              <Toggle prop="general" label="General" />
              <Toggle prop="anime" label="Anime" />
              <Toggle prop="people" label="People" />
            </box>
          }
          endWidget={
            <box vertical>
              <Toggle prop="sfw" label="SFW" />
              <Toggle prop="sketchy" label="Sketchy" />
              <Toggle prop="nsfw" label="NSFW" />
            </box>
          }
        />
        <Toggle prop="useImageFill" label="Resize to Fill" />
        <Toggle prop="useClearColor" label="Use Clear Color" />
        <Toggle prop="useExactResolution" label="Use Exact Resolution" />
        <Input label="Search Term" value={wallpaper.searchTerm} onChange={(v) => wallpaper.setSearchTerm(v)} />
        <Input label="Wallhaven API Key" value={wallpaper.apikey} onChange={(v) => wallpaper.setApikey(v)} />
        <Input label="Wallhaven Username" value={wallpaper.username} onChange={(v) => wallpaper.setUsername(v)} />
        <Input label="Wallhaven Collection" value={wallpaper.collection} onChange={(v) => wallpaper.setCollection(v)} />
        <Input
          label="Duration of each wallpaper (in minutes)"
          value={wallpaper.displayTime}
          onChange={(v) => {
            const val = parseInt(v)
            if (!isNaN(val) && val > 0) wallpaper.setDisplayTime(val)
          }}
        />
        <button class="button" onClicked={() => { const w = app.get_window("wallpaper-settings-menu"); if (w) w.visible = false }}>
          <label label="Close" />
        </button>
      </box>
    </window>
  )
}
