import AbstractView from './abstract-view';
import { MenuItems } from 'utils';

const createSiteMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
       <a class="trip-tabs__btn trip-tabs__btn--active"  id='${MenuItems.TABLE}' href="#">${MenuItems.TABLE}</a>
       <a class="trip-tabs__btn" id='${MenuItems.STATS}' href="#">${MenuItems.STATS}</a>
  </nav>`
);

export default class SiteMenuView extends AbstractView {
  #activeMenuItem = MenuItems.TABLE;

  get template() {
    return createSiteMenuTemplate(this.#activeMenuItem);
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#menuClickHandler);
  }

  blockMenuButtons = () => {
    this.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.add('trip-tabs__btn--disabled');
    this.element.querySelector(`[id=${MenuItems.STATS}]`).classList.add('trip-tabs__btn--disabled');
    this.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.remove('trip-tabs__btn--active');
    this.element.querySelector(`[id=${MenuItems.STATS}]`).classList.remove('trip-tabs__btn--active');
  }

  resetButtons = () => {
    this.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.remove('trip-tabs__btn--disabled');
    this.element.querySelector(`[id=${MenuItems.STATS}]`).classList.remove('trip-tabs__btn--disabled');
    this.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.add('trip-tabs__btn--active');
  }

  setTableButtonActive = () => {
    this.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.add('trip-tabs__btn--active');
    this.element.querySelector(`[id=${MenuItems.STATS}]`).classList.remove('trip-tabs__btn--active');
  }

  setStatButtonActive = () => {
    this.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.remove('trip-tabs__btn--active');
    this.element.querySelector(`[id=${MenuItems.STATS}]`).classList.add('trip-tabs__btn--active');
  }

  #menuClickHandler = (e) => {
    e.preventDefault();
    if(this.#activeMenuItem === e.target.innerText) {
      return;
    }
    this._callback.menuClick(e.target.innerText);
    if(e.target.innerText !== MenuItems.NEW_EVENT) {
      this.#activeMenuItem = e.target.innerText;
    }
  }
}
