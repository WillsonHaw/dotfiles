const Root = Widget.Calendar({
  className: 'calendar',
  showDayNames: true,
  showDetails: true,
  showHeading: true,
  showWeekNumbers: true,
  // detail: (self, y, m, d) => {
  //   return `<span color="white">${y}. ${m}. ${d}.</span>`;
  // },
  onDaySelected: ({ date: [y, m, d] }) => {
    print(`${y}. ${m}. ${d}.`);
  },
});

const Calendar = Widget.Window({
  name: 'calendar',
  anchor: ['bottom', 'left'],
  margins: [30, 60],
  child: Root,
  layer: 'overlay',
  keymode: 'exclusive',
  // keymode: 'on-demand',
  visible: false,
})
  // @ts-expect-error
  .keybind([], 'Escape', () => App.closeWindow('calendar'))
  // @ts-expect-error
  .hook(App, (self, name, visible) => {
    if (name === 'calendar') {
      // @ts-expect-error
      self.visible = visible;
    }
  });

export default Calendar;
