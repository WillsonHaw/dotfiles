import app from "ags/gtk3/app"
import BarGroup from "../BarGroup"
import BarWidget from "../BarWidget"

export default function Power() {
  return (
    <BarGroup className="power">
      <BarWidget onClicked={() => { const w = app.get_window("power-menu"); if (w) w.visible = !w.visible }}>
        <button>
          <label class="icon large" label="⏻" />
        </button>
      </BarWidget>
    </BarGroup>
  )
}
