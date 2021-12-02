export const countTotalSum = (array) => array.reduce((accumulator, item) => {
  const offersPrice = item.offers.reduce((acc, el) => acc + el.price, 0);

  return accumulator + item.price + offersPrice;
}, 0);