import { createComputed } from "ags"
import app from "ags/gtk4/app"
import { rawWeather, weatherIcon } from "../../../services/weather"

const text = createComputed(() => {
  if (!rawWeather()) return "..."
  try {
    const c = JSON.parse(rawWeather()).current_condition[0]
    return `${weatherIcon(parseInt(c.weatherCode))} ${c.FeelsLikeC}°`
  } catch { return "?" }
})

export default function Weather() {
  return (
    <button
      class="weather-btn"
      onClicked={() => {
        const w = app.get_window("weather-popup")
        if (w) w.visible = !w.visible
      }}
    >
      <label label={text} />
    </button>
  )
}
