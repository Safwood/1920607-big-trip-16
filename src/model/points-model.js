import AbstractObserver from 'utils/abstractObserver';
import { updateItem, removeElement, addItem, UpdateType } from 'utils';

export default class PointsModel extends AbstractObserver {
  #events = null;
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      const events = await this.#apiService.events;
      this.#events = events.map(this.#adaptToClient);
    } catch {
      this.#events = [];
    }

    this._notify(UpdateType.INIT)
  }

  get events() {
    return this.#events;
  }

  #adaptToClient = (event) => {
    const adaptedEvent = {...event,
      startDate: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'], // На клиенте дата хранится как экземпляр Date
      finishDate: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'], // На клиенте дата хранится как экземпляр Date
      isFavorite: event['is_favorite'],
      price: event['base_price'],
      type: (event.type)[0].toUpperCase() + (event.type).substring(1),
      description: event.destination.description,
      photos: event.destination.pictures,
      destination: event.destination.name
    };

    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];
    delete adaptedEvent['base_price'];

    return adaptedEvent;
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
