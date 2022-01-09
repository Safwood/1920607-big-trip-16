import AbstractView from './abstract-view';
import { FilterType } from 'utils';

const createTripFilterTemplate = (filterType, disabledFilters) => (`<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" 
      ${disabledFilters.includes(FilterType.EVERYTHING) ? 'disabled' : ''} ${filterType === FilterType.EVERYTHING ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" 
      ${disabledFilters.includes(FilterType.FUTURE) ? 'disabled' : ''} ${filterType === FilterType.FUTURE ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past"
       ${disabledFilters.includes(FilterType.PAST) ? 'disabled' : ''} ${filterType === FilterType.PAST ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class TripFilterView extends AbstractView {
  #filterType = null;
  #disabledFilters = null;

  constructor(filterType, disabledFilters) {
    super();
    this.#filterType = filterType;
    this.#disabledFilters = disabledFilters;
  }

  get template() {
    return createTripFilterTemplate(this.#filterType, this.#disabledFilters);
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
