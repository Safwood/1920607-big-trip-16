import TripFilterView from 'view/trip-filter-view';
import { render, RenderPosition, remove, UpdateType, replace, FilterType, filter } from 'utils';

export default class FilterPresenter {
  #container = null;
  #tripFilterView = null;
  #filterModel = null;
  #pointsModel = null;
  #disabledFilters = [];

  constructor(container, filterModel, pointsModel) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    const prevComponent = this.#tripFilterView;
    this.#disabledFilters = this.disabledFilters;
    this.#tripFilterView = new TripFilterView(this.#filterModel.filter, this.#disabledFilters);
    this.#addFilterHandler();

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    if(prevComponent === null) {
      render(this.#container, this.#tripFilterView, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripFilterView, prevComponent);
    remove(prevComponent);
  }

  get disabledFilters() {
    const result = [];
    const events = this.#pointsModel.events;

    if(!events) {return [];}
    if(!events.length) {return [FilterType.EVERYTHING, FilterType.FUTURE, FilterType.FUTURE];}
    if(!(filter[FilterType.FUTURE](events)).length) {result.push(FilterType.FUTURE);}
    if(!(filter[FilterType.PAST](events)).length) {result.push(FilterType.PAST);}

    return result;
  }

  #addFilterHandler = () => {
    this.#tripFilterView.setChangeFilterHandler((filterType) => {
      this.#handleFilterChange(filterType);
    });
  }

  #handleModelEvent = (updateType) => {
    if(updateType === UpdateType.MAJOR) {
      this.init();
    }
  }

  #handleFilterChange = (filterType) => {
    if(this.#filterModel.filter === filterType || !FilterType[filterType] || this.#disabledFilters.includes(filterType)) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  destroy = () => {
    remove(this.#tripFilterView);
    this.#tripFilterView = null;

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }
}
