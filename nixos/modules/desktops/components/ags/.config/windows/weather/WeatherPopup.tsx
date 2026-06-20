import { Accessor, createComputed } from "ags"
import { Astal } from "ags/gtk4"
import Gtk from "gi://Gtk?version=4.0"
import Gdk from "gi://Gdk?version=4.0"
import app from "ags/gtk4/app"
import { rawWeather, weatherIcon } from "../../services/weather"

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

function getDayName(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number)
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(y, m - 1, d).getDay()]
}

function parse<T>(fn: (d: any) => T, fallback: T): Accessor<T> {
  return createComputed(() => {
    if (!rawWeather()) return fallback
    try { return fn(JSON.parse(rawWeather())) } catch { return fallback }
  })
}

function ForecastDay({ index }: { index: number }) {
  const icon  = parse(d => weatherIcon(parseInt((d.weather[index].hourly.find((h: any) => h.time === "1200") ?? d.weather[index].hourly[4]).weatherCode)), "")
  const name  = parse(d => getDayName(d.weather[index].date), "")
  const range = parse(d => `${d.weather[index].mintempC}° – ${d.weather[index].maxtempC}°`, "")
  const desc  = parse(d => (d.weather[index].hourly.find((h: any) => h.time === "1200") ?? d.weather[index].hourly[4]).weatherDesc[0]?.value ?? "", "")

  return (
    <box class="forecast-day" orientation={Gtk.Orientation.VERTICAL} spacing={6}>
      <label class="forecast-name" label={name} />
      <label class="forecast-icon" label={icon} />
      <label class="forecast-range" label={range} />
      <label class="forecast-desc" label={desc} />
    </box>
  )
}

export default function WeatherPopup() {
  const curIcon    = parse(d => weatherIcon(parseInt(d.current_condition[0].weatherCode)), "")
  const curDesc    = parse(d => d.current_condition[0].weatherDesc[0]?.value ?? "", "Loading...")
  const curTemp    = parse(d => `${d.current_condition[0].temp_C}°C  ·  Feels like ${d.current_condition[0].FeelsLikeC}°C`, "")
  const curDetails = parse(d => `Humidity ${d.current_condition[0].humidity}%  ·  Wind ${d.current_condition[0].windspeedKmph} km/h`, "")

  const dismiss = () => { const w = app.get_window("weather-popup"); if (w) w.visible = false }

  let popup: any = null

  return (
    <window
      name="weather-popup"
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={app}
      visible={false}
      $={(win: any) => {
        const key = new Gtk.EventControllerKey()
        key.connect("key-pressed", (_c: any, keyval: number) => {
          if (keyval === Gdk.KEY_Escape) { dismiss(); return true }
          return false
        })
        win.add_controller(key)

        const click = new Gtk.GestureClick()
        click.connect("released", (_c: any, _n: number, x: number, y: number) => {
          if (!popup) { dismiss(); return }
          const [ok, rect] = popup.compute_bounds(win)
          if (!ok || x < rect.origin.x || x > rect.origin.x + rect.size.width ||
              y < rect.origin.y || y > rect.origin.y + rect.size.height) {
            dismiss()
          }
        })
        win.add_controller(click)
      }}
    >
      <box
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.START}
        marginTop={44}
        $={(box: any) => { popup = box }}
      >
        <box class="weather-popup" orientation={Gtk.Orientation.VERTICAL} spacing={16}>
          <box class="wp-current" orientation={Gtk.Orientation.VERTICAL} spacing={6}>
            <box spacing={10}>
              <label class="wp-icon" label={curIcon} />
              <box orientation={Gtk.Orientation.VERTICAL}>
                <label class="wp-desc" label={curDesc} xalign={0} />
                <label class="wp-temp" label={curTemp} xalign={0} />
                <label class="wp-details" label={curDetails} xalign={0} />
              </box>
            </box>
          </box>
          <box class="wp-separator" />
          <box class="wp-forecast" homogeneous spacing={24}>
            <ForecastDay index={0} />
            <ForecastDay index={1} />
            <ForecastDay index={2} />
          </box>
        </box>
      </box>
    </window>
  )
}
