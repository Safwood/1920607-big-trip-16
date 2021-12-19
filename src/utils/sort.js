import dayjs from 'dayjs';

export const sort = (array, sortType) => {
  switch(sortType) {
    case 'day':
      array.sort((a, b) => {
        if(dayjs(a.startDate).format('YYYY/MM/DD') < dayjs(b.startDate).format('YYYY/MM/DD')) {return -1;}
        if(dayjs(a.startDate).format('YYYY/MM/DD') > dayjs(b.startDate).format('YYYY/MM/DD')) {return 1;}
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
        if(dayjs(a.startDate).format('HH/mm') < dayjs(b.startDate).format('HH/mm')) {return -1;}
        if(dayjs(a.startDate).format('HH/mm') > dayjs(b.startDate).format('HH/mm')) {return 1;}
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
