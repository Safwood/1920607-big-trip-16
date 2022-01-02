import AbstractView from './abstract-view';
import { FilterType } from 'utils';

const createTripFilterTemplate = (filterType) => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${filterType === FilterType.EVERYTHING ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${filterType === FilterType.FUTURE ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${filterType === FilterType.PAST ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class TripFilterView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createTripFilterTemplate(this.#filterType);
  }

  setChangeFilterHandler = (callback) => {
    this._callback.changeFilter = callback;
    this.element.addEventListener('click', this.#handleFilterChange);
  }

  #handleFilterChange = (e) => {
    e.preventDefault();
    this._callback.changeFilter((e.target.innerText));
  }
}
