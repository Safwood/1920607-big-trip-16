import AbstractView from './abstract-view';
import { NoEventTextType } from 'utils';

const createNoEventTemplate = (text) => `<p class="trip-events__msg">${text}</p>`;

export default class NoEventView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventTemplate(NoEventTextType[this.#filterType]);
  }
}
