import { sort, SortingType } from 'utils';

export const countTotalSum = (array) => array.reduce((accumulator, item) => {
  const offersPrice = item.offers.reduce((acc, el) => acc + el.price, 0);

  return accumulator + item.price + offersPrice;
}, 0);

export const getEventRoute = (array) => {
  const sortedArray = sort(array, SortingType.DAY);

  if(sortedArray.length > 3) {
    return [sortedArray[0].destination, '...', sortedArray[sortedArray.length - 1].destination];
  } else {
    const result = [];
    sortedArray.forEach((event) => result.push(event.destination));
    return result;
  }
};

export const getEventDates = (array) => {
  const sortedArray = sort(array, SortingType.DAY);
  return [sortedArray[0].startDate, sortedArray[sortedArray.length - 1].finishDate];
};
