import BarGroup from '../BarGroup';

const SECOND = 1000;
const MINUTE = 60 * SECOND;

const clockHour = Variable('', { poll: [MINUTE, "date '+%H'"] });
const clockMin = Variable('', { poll: [SECOND, "date '+%M'"] });
const clockMonth = Variable('', { poll: [MINUTE, "date '+%a'"] });
const clockDay = Variable('', { poll: [MINUTE, "date '+%d'"] });

const Clock = BarGroup({
  className: 'clock',
  children: [
    Widget.Label({ label: clockHour.bind() }),
    Widget.Label({ label: clockMin.bind() }),
    Widget.Label({ label: '••' }),
    Widget.Label({ label: clockMonth.bind() }),
    Widget.Label({ label: clockDay.bind() }),
  ],
});

export default Clock;
