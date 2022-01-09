import TripSortingView from 'view/trip-sorting-view';
import { render, RenderPosition, remove, UpdateType, replace } from 'utils';

export default class SortingPresenter {
  #container = null;
  #sortingModel = null;
  #tripSortingView = null;

  constructor(container, sortingModel, pointsModel) {
    this.#container = container;
    this.#sortingModel = sortingModel;
  }

  init() {
    const prevComponent = this.#tripSortingView;
    this.#tripSortingView = new TripSortingView(this.#sortingModel.sortType);
    this.#setHandlers();

    this.#sortingModel.addObserver(this.#handleModelEvent);

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

  #handleModelEvent = (updateType) => {
    if(updateType === UpdateType.MINOR) {
      this.init();
    }
  }

  #handleSortTypeChange = (sortType) => {
    if(this.#sortingModel.sortType === sortType) {
      return;
    }

    this.#sortingModel.setSortType(UpdateType.MINOR, sortType);
  }

  destroy = () => {
    remove(this.#tripSortingView);
    this.#tripSortingView = null;

    this.#sortingModel.removeObserver(this.#handleModelEvent);
  }
}
