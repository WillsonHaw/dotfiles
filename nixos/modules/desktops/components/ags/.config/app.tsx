import app from "ags/gtk4/app"
import style from "./styles/styles.scss"

import Bar from "./windows/bar/Bar"
import Calendar from "./windows/calendar/Calendar"
import PowerMenu from "./windows/power-menu/PowerMenu"
import WallpaperSettings from "./windows/wallpaper/WallpaperSettings"
import WeatherPopup from "./windows/weather/WeatherPopup"
import wallpaper from "./services/wallpaper"

app.start({
  css: style,
  requestHandler(request: string[], res: (response: any) => void) {
    if (request[0] === "next-wallpaper") {
      wallpaper.random().catch(() => {})
      res("ok")
    } else if (request[0] === "panic-wallpaper") {
      wallpaper.panic().catch(() => {})
      res("ok")
    } else {
      res("unknown")
    }
  },
  main() {
    Bar()
    Calendar()
    PowerMenu()
    WallpaperSettings()
    WeatherPopup()
  },
})
