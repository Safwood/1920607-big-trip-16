import TripFilterView from 'view/trip-filter-view';
import { render, RenderPosition, remove, UpdateType, replace } from 'utils';

export default class FilterPresenter {
  #container = null;
  #tripFilterView = null;
  #filterModel = null;
  #pointsModel = null;

  constructor(container, filterModel, pointsModel) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const prevComponent = this.#tripFilterView;
    this.#tripFilterView = new TripFilterView(this.#filterModel.filter);
    this.#addFilterHandler();

    if(prevComponent === null) {
      render(this.#container, this.#tripFilterView, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripFilterView, prevComponent);
    remove(prevComponent);
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
    if(this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  destroy = () => {
    remove(this.#tripFilterView);
    this.#tripFilterView = null;
  }
}
