import app from "ags/gtk3/app"
import style from "./styles/styles.scss"

import Bar from "./windows/bar/Bar"
import Calendar from "./windows/calendar/Calendar"
import PowerMenu from "./windows/power-menu/PowerMenu"
import WallpaperSettings from "./windows/wallpaper/WallpaperSettings"
import WallpaperDetails from "./windows/wallpaper/WallpaperDetails"

app.start({
  css: style,
  main() {
    Bar()
    Calendar()
    PowerMenu()
    WallpaperSettings()
    WallpaperDetails()
  },
})
