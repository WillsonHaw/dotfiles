import { createComputed } from "ags"
import { Astal } from "ags/gtk3"
import Gtk from "gi://Gtk?version=3.0"
import Gdk from "gi://Gdk?version=3.0"
import app from "ags/gtk3/app"
import { rawWeather, weatherIcon } from "../../services/weather"

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

function getDayName(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number)
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(y, m - 1, d).getDay()]
}

function parse<T>(fn: (d: any) => T, fallback: T): () => T {
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
    <box class="forecast-day" vertical spacing={6}>
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

  return (
    <window
      name="weather-popup"
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={app}
      visible={false}
      onKeyPressEvent={(_self: any, event: Gdk.EventKey) => {
        if (event.keyval === Gdk.KEY_Escape) dismiss()
      }}
    >
      <eventbox onClickRelease={dismiss}>
        <box halign={Gtk.Align.CENTER} valign={Gtk.Align.START} marginTop={44}>
          <eventbox>
            <box class="weather-popup" vertical spacing={16}>
              <box class="wp-current" vertical spacing={6}>
                <box spacing={10}>
                  <label class="wp-icon" label={curIcon} />
                  <box vertical>
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
          </eventbox>
        </box>
      </eventbox>
    </window>
  )
}
