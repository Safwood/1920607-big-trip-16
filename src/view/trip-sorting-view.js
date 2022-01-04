import { SortingType } from 'utils';
import AbstractView from './abstract-view';

const createTripSortingTemplate = (activeSortingType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day"  class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${activeSortingType === SortingType.DAY ? 'checked' : ''}>
      <label class="trip-sort__btn" data-sort-type="day" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event"  ${activeSortingType === SortingType.EVENT ? 'checked' : ''}>
      <label class="trip-sort__btn" data-sort-type="event" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${activeSortingType === SortingType.TIME ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-time" data-sort-type="time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${activeSortingType === SortingType.PRICE ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-price" data-sort-type="price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer" data-sort-type="offers">Offers</label>
    </div>
  </form>`
);

export default class TripSortingView extends AbstractView {
  #activeSortingType = null;

  constructor(sortType) {
    super();
    this.#activeSortingType = sortType;
  }

  get template() {
    return createTripSortingTemplate(this.#activeSortingType);
  }

  setSortingHandler = (callback) => {
    this._callback.handleSorting = callback;
    this.element.addEventListener('click', this.#handleSortingFormClick);
  }

  #handleSortingFormClick = (e) => {
    e.preventDefault();
    if(e.target.dataset.sortType === this.#activeSortingType || !e.target.dataset.sortType) {
      return;
    }
    this.#activeSortingType = e.target.dataset.sortType;
    this._callback.handleSorting(e.target.dataset.sortType);
  }
}
