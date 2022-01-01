import TripFilterView from 'view/trip-filter-view';
import { render, RenderPosition, remove } from 'utils';

export default class FilterPresenter {
  #container = null;
  #filterType = null;
  #tripFilterView = null;
  #changeFilter = null;

  constructor(container, filterType, changeFilter) {
    this.#container = container;
    this.#filterType = filterType;
    this.#changeFilter = changeFilter;
  }
  
  init = () => {
    this.#tripFilterView = new TripFilterView(this.#filterType)
    render(this.#container, this.#tripFilterView, RenderPosition.AFTERBEGIN);
    this.#addFilterHandler();
  }


  #addFilterHandler = () => {
    this.#tripFilterView.setChangeFilterHandler((filterType) => {
      this.#changeFilter(filterType)
    })
  }

  destroy = () => {
    remove(this.#tripFilterView);
  }
}