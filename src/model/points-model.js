import AbstractObserver from 'utils/abstractObserver';

export default class PointsModel extends AbstractObserver {
  #events = null;

  get events() {
    return this.#events;
  }

  set events(events) {
    this.#events = [...events];
  }
}