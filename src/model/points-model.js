import AbstractObserver from 'utils/abstractObserver';
import { updateItem, removeElement, addItem, UpdateType } from 'utils';

export default class PointsModel extends AbstractObserver {
  #events = null;
  #apiService = null;
  #allPossiblePoints = null;
  #allPossibleOffers = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      const events = await this.#apiService.events;
      this.#events = events.map(this.#adaptToClient);
      this.#allPossiblePoints = await this.#apiService.loadAllPoint();
      this.#allPossibleOffers = await this.#apiService.loadAllOffers();
    } catch {
      this.#events = [];
      this.#allPossiblePoints = [];
      this.#allPossibleOffers = [];
    }

    this._notify(UpdateType.INIT);
  }

  get events() {
    return this.#events;
  }

  get allDestinations() {
    return this.#allPossiblePoints;
  }

  get allOffers() {
    return this.#allPossibleOffers;
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

  changeEvent = async (updateType, update) => {
    try {
      const response = await this.#apiService.updateEvent(update);
      const udaptedEvent = this.#adaptToClient(response);

      this.#events = updateItem(this.#events, udaptedEvent);
      this._notify(updateType, udaptedEvent);
    } catch {
      throw new Error('Can\'t update event');
    }
  }

  addEvent = async (updateType, addedEvent) => {
    try {
      const response = await this.#apiService.addEvent(addedEvent);
      const udaptedEvent = this.#adaptToClient(response);
      this.#events = addItem(this.#events, udaptedEvent);
      this._notify(updateType, udaptedEvent);

    } catch {
      throw new Error('Can\'t add event');
    }
  }

  removeEvent = async (updateType, removedEvent) => {
    try {
      await this.#apiService.deleteEvent(removedEvent);
      this.#events = removeElement(this.#events, removedEvent);
      this._notify(updateType, removedEvent);

    } catch {
      throw new Error('Can\'t remove event');
    }
  }
}
