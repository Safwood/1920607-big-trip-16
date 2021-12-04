import { createElement } from '../utils';


export default class AbstractView {
  #element = null;

  constructor() {
    if(new.target === AbstractView) {
      throw new Error ('Can\'t initiate AbstractView, only extend from it.')
    }
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('Replace abstract method "template" for your own.')
  }

  removeElement() {
    this.#element = null;
  }
}