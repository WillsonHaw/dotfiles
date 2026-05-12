import { Astal } from "ags/gtk3"
import app from "ags/gtk3/app"
import TopSection from "./TopSection"
import BottomSection from "./BottomSection"

const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor

export default function Bar() {
  return (
    <window
      name="bar"
      anchor={TOP | LEFT | BOTTOM}
      application={app}
      visible
    >
      <centerbox class="bar-window" vertical startWidget={<TopSection />} endWidget={<BottomSection />} />
    </window>
  )
}
