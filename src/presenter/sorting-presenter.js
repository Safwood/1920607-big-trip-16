import TripSortingView from 'view/trip-sorting-view';
import { render, RenderPosition, remove } from 'utils';

export default class sortingPresenter {
  #container = null;
  #handleSortTypeChange = null;
  #tripSortingView = null;

  constructor(handleSortCallback, sortType) {
    this.#tripSortingView = new TripSortingView(sortType);
    this.#handleSortTypeChange = handleSortCallback;
  }

  init(container) {
    this.#container = container;
    this.#setHandlers();
    this.#renderTripSortingView();
  }

  #setHandlers = () => {
    this.#tripSortingView.setSortingHandler((sortingType) => {
      this.#handleSortTypeChange(sortingType);
    });
  }

  #renderTripSortingView = () => {
    render(this.#container, this.#tripSortingView, RenderPosition.AFTERBEGIN);
  }

  destroy = () => {
    remove(this.#tripSortingView);
  }
}
