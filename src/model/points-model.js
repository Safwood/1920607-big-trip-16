import AbstractObserver from 'utils/abstractObserver';
import { updateItem, removeElement, addItem } from 'utils';

export default class PointsModel extends AbstractObserver {
  #events = null;

  get events() {
    return this.#events;
  }

  set events(events) {
    this.#events = [...events];
  }

  changeEvent = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
  }

  addEvent = (addedEvent) => {
    this.#events = addItem(this.#events, addedEvent);
  }

  removeEvent = (removedEvent) => {
    this.#events = removeElement(this.#events, removedEvent);
  }
}