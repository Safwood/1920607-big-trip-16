import TripSortingView from 'view/trip-sorting-view';
import { render, RenderPosition, remove, UpdateType, replace } from 'utils';

export default class SortingPresenter {
  #container = null;
  #sortingModel = null;
  #pointsModel = null;
  #tripSortingView = null;

  constructor(container, sortingModel, pointsModel) {
    this.#container = container;
    this.#sortingModel = sortingModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#sortingModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevComponent = this.#tripSortingView;
    this.#tripSortingView = new TripSortingView(this.#sortingModel.sortType);
    this.#setHandlers();

    if(prevComponent === null) {
      render(this.#container, this.#tripSortingView, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripSortingView, prevComponent);
    remove(prevComponent);
  }

  #setHandlers = () => {
    this.#tripSortingView.setSortingHandler((sortingType) => {
      this.#handleSortTypeChange(sortingType);
    });
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleSortTypeChange = (sortType) => {
    if(this.#sortingModel.sortType === sortType) {
      return;
    }

    this.#sortingModel.setSortType(UpdateType.MAJOR, sortType);
  }

  destroy = () => {
    remove(this.#tripSortingView);
    this.#tripSortingView = null;
  }
}
