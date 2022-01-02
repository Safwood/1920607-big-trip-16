import { FilterType } from 'utils';

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => event.startDate > Date.now()),
  [FilterType.PAST]: (events) => events.filter((event) => event.finishDate < Date.now()),
};