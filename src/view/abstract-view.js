import { createElement } from '../utils';

const SHAKE_ANIMATION_TIMEOUT = 600;

export default class AbstractView {
  #element = null;
  _callback = {};

  constructor() {
    if(new.target === AbstractView) {
      throw new Error ('Can\'t initiate AbstractView, only extend from it.');
    }
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('Replace abstract method "template" for your own.');
  }

  shake(callback) {
    this.element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.element.style.animation = '';
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  removeElement() {
    this.#element = null;
  }
}
