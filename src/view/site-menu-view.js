import AbstractView from './abstract-view';
import { MenuItems } from 'utils';

const createSiteMenuTemplate = (activeItem) => (
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

  #menuClickHandler = (e) => {
    e.preventDefault();
    if(this.#activeMenuItem === e.target.innerText) {
      return
    }
    this._callback.menuClick(e.target.innerText);
    if(e.target.innerText !== MenuItems.NEW_EVENT) {
      this.#activeMenuItem = e.target.innerText;
    }
  }
}
