import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const countDuration = (start, finish) => {
  const durationInMinutes = dayjs(start).diff(dayjs(finish), 'minute');

  if(durationInMinutes < 60) {
    return `${dayjs.duration(durationInMinutes, 'minute').format('mm')}M`;
  }

  if(durationInMinutes >= 60 && durationInMinutes < (24*60)) {
    return `${dayjs.duration(durationInMinutes, 'minute').format('HH')}H ${dayjs.duration(durationInMinutes, 'minute').format('mm')}M`;
  }

  return `${dayjs.duration(durationInMinutes, 'minute').format('DD')}D ${dayjs.duration(durationInMinutes, 'minute').format('HH')}H ${dayjs.duration(durationInMinutes, 'minute').format('mm')}M`;
};
