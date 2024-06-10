const audio = await Service.import('audio');

const showBar = Variable(false);

function getIcon(volume: number, isMuted: boolean | null) {
  let icon = '';

  if (isMuted) {
    return icon;
  } else if (volume > 0.66) {
    icon = '';
  } else if (volume > 0.2) {
    icon = '';
  } else if (volume > 0.01) {
    icon = '';
  }

  return icon;
}

const Volume = Widget.EventBox({
  className: 'widget volume',
  onHover: () => showBar.setValue(true),
  onHoverLost: () => showBar.setValue(false),
  child: Widget.Box({
    vertical: true,
    children: [
      Widget.Revealer({
        className: 'bar',
        revealChild: showBar.bind(),
        transition: 'slide_up',
        child: Widget.Slider({
          onChange: ({ value }) => (audio.speaker.volume = value),
          vertical: true,
          inverted: true,
          value: audio.speaker.bind('volume'),
          min: 0,
          max: 1,
          marks: [],
        }),
      }),
      Widget.Button({
        onClicked: () => (audio.speaker.is_muted = !audio.speaker.is_muted),
        child: Widget.CircularProgress({
          className: `circular-progress`,
          rounded: true,
          child: Widget.Label({
            className: 'icon large',
            label: '',
          }),
          value: audio.speaker.bind('volume'),
        }) // @ts-expect-error
          .hook(audio, (self) => {
            self.child.label = getIcon(audio.speaker.volume, audio.speaker.is_muted);
          }),
      }),
    ],
  }),
});

export default Volume;
