const audio = await Service.import('audio');

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

const Volume = Widget.CircularProgress({
  className: `widget circular-progress volume`,
  rounded: true,
  child: Widget.Label({
    className: 'icon large',
    label: '',
  }),
  value: audio.speaker.bind('volume'),
  // @ts-expect-error
}).hook(audio, (self) => {
  self.child.label = getIcon(audio.speaker.volume, audio.speaker.is_muted);
});

export default Volume;
