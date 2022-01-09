import AbstractView from './abstract-view';
import dayjs from 'dayjs';

const getRoute = (route) => route.map((point, index) => {
  if(route.length - 1 === index) {
    return point;
  } else {
    return `${point  } &mdash; `;
  }
}).join('');

const getDates = (dates) => dates.map((date, index) => {
  if(dates.length - 1 === index) {
    return dayjs(date).format('DD MMM');
  } else {
    return `${dayjs(date).format('MMM DD')  }&nbsp;&mdash;&nbsp;`;
  }
}).join('');

const createTripInfoTemplate = (totalPrice, route, dates) => {
  const eventRoute = getRoute(route);
  const eventDates = getDates(dates);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${eventRoute}</h1>

      <p class="trip-info__dates">${eventDates}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`;
};

export default class TripInfoView extends AbstractView {
  #totalPrice = null;
  #route = null;
  #dates = null;

  constructor(totalPrice, route, dates) {
    super();
    this.#totalPrice = totalPrice || 0;
    this.#route = route || [];
    this.#dates = dates || [];
  }

  get template() {
    return createTripInfoTemplate(this.#totalPrice, this.#route, this.#dates);
  }

}
