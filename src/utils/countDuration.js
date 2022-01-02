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

export const countDurationInMinutes = (start, finish) => dayjs(start).diff(dayjs(finish), 'minute');

export const convertMinutesToTime = (minutes) => {

  if(minutes < 60) {
    return `${dayjs.duration(minutes, 'minute').format('mm')}M`;
  }

  if(minutes >= 60 && minutes < (24*60)) {
    return `${dayjs.duration(minutes, 'minute').format('HH')}H ${dayjs.duration(minutes, 'minute').format('mm')}M`;
  }

  return `${dayjs.duration(minutes, 'minute').format('DD')}D ${dayjs.duration(minutes, 'minute').format('HH')}H ${dayjs.duration(minutes, 'minute').format('mm')}M`;
};