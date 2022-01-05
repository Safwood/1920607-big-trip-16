import { Method } from 'utils';

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get events() {
    return this.#load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }

  loadAllPoint = async () => {
    const response = await this.#load({
      url: `destinations`,
      method: Method.GET,
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  updateEvent = async (event) => {
    const response = await this.#load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer = (event) => {
    const adaptedEvent = {...event,
      'date_from': event.startDate instanceof Date ? event.startDate.toISOString() : null,
      'date_to': event.finishDate instanceof Date ? event.finishDate.toISOString() : null,
      'is_favorite': event.isFavorite,
      'base_price': Number(event.price),
      'destination': {
        name: event.destination,
        description: event.description,
        pictures: event.photos
      },
      'type': (event.type).toLowerCase()
    };

    delete adaptedEvent.description;
    delete adaptedEvent.photos;
    delete adaptedEvent.startDate;
    delete adaptedEvent.finishDate;
    delete adaptedEvent.isFavorite;
    delete adaptedEvent.price;

    return adaptedEvent;
  }
}