import { countDuration, getTime, convertDateWithMonth, convertDateWithYear, convertDateWithTime } from 'utils';
import AbstractView from './abstract-view';

const createOffersTemplate = (offers) => (
  `<ul class="event__selected-offers">
    ${offers.map((offer) => offer.checked 
      ? `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
      </li>`
      : ''
    ).join('')}
  </ul>`
);

const createEventItemTemplate = (event) => {
  const startDay = convertDateWithMonth(event.startDate);
  const startDayWithYear = convertDateWithYear(event.startDate);
  const finishTimeWithDate = convertDateWithTime(event.finishDate);
  const startTimeFromDate = convertDateWithTime(event.startDate);
  const finishTime = getTime(event.finishDate);
  const startTime = getTime(event.startDate);
  const duration = countDuration(event.finishDate, event.startDate);

  const isFavouriteClassName = `event__favorite-btn ${event.isFavorite ? 'event__favorite-btn--active' : ''}`;

  const offersTemplate = createOffersTemplate(event.offers);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${startDayWithYear}">${startDay}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${(event.type).toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${event.type} ${event.destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startTimeFromDate}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${finishTimeWithDate}">${finishTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${event.price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${offersTemplate}
      <button class="${isFavouriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};


export default class EventItemView extends AbstractView {
  #event = null;

  constructor(event) {
    super();
    this.#event = event;
  }

  get template() {
    return createEventItemTemplate(this.#event);
  }

  setEditClickHandler = (callback) => {
    this._callback.editEventItem = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editElement);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.setIsFavorite = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#setFavorite);
  }

  #editElement = (e) => {
    e.preventDefault();
    this._callback.editEventItem();
  }

  #setFavorite = (e) => {
    e.preventDefault();
    this._callback.setIsFavorite();
  }
}
