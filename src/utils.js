
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { possibleDurationTimeMinutes, possibleEventPrice, descriptionText } from './mock/events';
import { offersTypes } from './mock/events';

dayjs.extend(duration);

export const getRandomIntenger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateRandomDate = (eventType) => {
  //использую минуты чтобы легче было установить рандомное время
  const randomMinutesIntervalFromToday = getRandomIntenger(15, 43200);
  const randomDurationTime = getRandomIntenger(15, possibleDurationTimeMinutes[eventType]);

  return {
    eventStartDate: dayjs().add(randomMinutesIntervalFromToday, 'minute').toDate(),
    eventFinishDate: dayjs().add(randomMinutesIntervalFromToday + randomDurationTime, 'minute').toDate(),
  };
};

export const generateEventCity = () => {
  const places = ['Amsterdam', 'Chamonix', 'Paris'];
  const randomIndex = getRandomIntenger(0, places.length - 1);
  return places[randomIndex];
};

export const generateEventType = () => {
  const eventTypes = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

  const randomIndex = getRandomIntenger(0, eventTypes.length - 1);
  return eventTypes[randomIndex];
};

export const generateRandomPrice = (eventType) => getRandomIntenger(possibleEventPrice[eventType].min, possibleEventPrice[eventType].max);

export const generateDescription = () => {
  const sentencesCount = getRandomIntenger(1, 10);
  const sentencesStartingIndex = getRandomIntenger(0, (10-sentencesCount));

  return descriptionText.split('.').splice(sentencesStartingIndex, sentencesCount).join('.');
};

export const getRandomPhotos = () => {
  const photos = [];
  const randomCount = getRandomIntenger(0, 5);
  for (let i = 0; i < randomCount; i++) {
    photos.push(`http://picsum.photos/248/152?r=${getRandomIntenger(0, 1000)}`);
  }
  return photos;
};

export const getIsFavourite = () => Boolean(getRandomIntenger(0, 1));

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

export const generateEvent = () => {
  const eventType = generateEventType();
  const dates = generateRandomDate(eventType);
  countDuration(dates.eventStartDate, dates.eventFinishDate);
  return {
    destination: generateEventCity(),
    type: eventType,
    startDate: dates.eventStartDate,
    finishDate: dates.eventFinishDate,
    price: generateRandomPrice(eventType),
    offers: (offersTypes.find((el) => el.type === eventType)).offers,
    isFavorite: getIsFavourite(),
    photos: getRandomPhotos(),
    description: generateDescription(),
  };
};

export const countTotalSum = (array) => array.reduce((accumulator, item) => {
  const offersPrice = item.offers.reduce((acc, el) => acc + el.price, 0);

  return accumulator + item.price + offersPrice;
}, 0);
