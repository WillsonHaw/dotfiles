import { createPoll } from "ags/time"
import app from "ags/gtk3/app"
import BarGroup from "../BarGroup"

const SECOND = 1000
const MINUTE = 60 * SECOND

const clockHour = createPoll("", MINUTE, "date '+%H'")
const clockMin = createPoll("", SECOND, "date '+%M'")
const clockMonth = createPoll("", MINUTE, "date '+%a'")
const clockDay = createPoll("", MINUTE, "date '+%d'")

export default function Clock() {
  return (
    <BarGroup className="clock">
      <button onClicked={() => { const w = app.get_window("calendar"); if (w) w.visible = !w.visible }}>
        <box vertical>
          <label label={clockHour} />
          <label label={clockMin} />
          <label label="••" />
          <label label={clockMonth} />
          <label label={clockDay} />
        </box>
      </button>
    </BarGroup>
  )
}
