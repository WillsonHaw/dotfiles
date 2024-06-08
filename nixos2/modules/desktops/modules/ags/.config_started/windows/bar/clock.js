const date = Variable('', {
  poll: [1000, 'date'],
});

const Clock = Widget.Label({
  label: date.bind().as((d) => `${d}`),
});

export default Clock;
