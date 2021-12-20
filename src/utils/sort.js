import { convertDateWithYear, getTime } from 'utils';

export const sort = (array, sortType) => {
  switch(sortType) {
    case 'day':
      array.sort((a, b) => {
        const dateA = convertDateWithYear(a.startDate);
        const dateB = convertDateWithYear(b.startDate);
        if(dateA < dateB) {return -1;}
        if(dateA > dateB) {return 1;}
      });
      break;
    case 'event':
      array.sort((a, b) => {
        if(a.type < b.type) {return -1;}
        if(a.type > b.type) {return 1;}
      });
      break;
    case 'time':
      array.sort((a, b) => {
        const timeA = getTime(a.startDate);
        const timeB = getTime(b.startDate);
        if(timeA < timeB) {return -1;}
        if(timeA > timeB) {return 1;}
      });
      break;
    case 'price':
      array.sort((a, b) => a.price - b.price);
      break;
    case 'offers':
      array.sort((a, b) => a.offers.length - b.offers.length);
      break;
  }

  return array;
};
