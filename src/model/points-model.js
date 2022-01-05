import AbstractObserver from 'utils/abstractObserver';
import { updateItem, removeElement, addItem } from 'utils';

export default class PointsModel extends AbstractObserver {
  #events = null;
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;

    this.#apiService.events.then((events) => {
      console.log(events);
    });
  }

  get events() {
    return this.#events;
  }

  set events(events) {
    this.#events = [...events];
  }

  changeEvent = (updateType, updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this._notify(updateType, updatedEvent);
  }

  addEvent = (updateType, addedEvent) => {
    this.#events = addItem(this.#events, addedEvent);
    this._notify(updateType, addedEvent);
  }

  removeEvent = (updateType, removedEvent) => {
    this.#events = removeElement(this.#events, removedEvent);
    this._notify(updateType, removedEvent);
  }
}
