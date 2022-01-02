import AbstractObserver from 'utils/abstractObserver';
import { SortingType } from 'utils';

export default class SortingModel extends AbstractObserver {
  #sortType = SortingType.DAY;

  get sortType() {
    return this.#sortType;
  }

  setSortType = (updateType, sortType) => {
    this.#sortType = sortType;
    this._notify(updateType, sortType);
  }
}
