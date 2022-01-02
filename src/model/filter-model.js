import AbstractObserver from 'utils/abstractObserver';
import { FilterType } from 'utils';

export default class FilterModel extends AbstractObserver {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}