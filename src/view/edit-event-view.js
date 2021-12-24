import SmartView from './smart-view';
import { BLANK_EVENT, getTime, convertDateWithDay, eventTypes } from 'utils';

const createOffersTemplate = (offers, type) => 
`<div class="event__available-offers">
  ${offers.map((offer) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" data-offer-id="${offer.id}" id="event-offer-${type}-${offer.id}" type="checkbox" name="event-offer-${type}" ${offer.checked ? 'checked' : ''}>
    <label class="event__offer-label"  for="event-offer-${type}-${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`)}
</div>`;

const createAllEventTypesTemplate = () =>
`<div class="event__type-list">
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${eventTypes.map(event => `<div class="event__type-item">
    <input id="event-type-${event.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${event.toLowerCase()}>
    <label class="event__type-label  event__type-label--${event.toLowerCase()}" for="event-type-${event.toLowerCase()}-1">${event}</label>
    </div>`).join('')}
  </fieldset>
</div>`

const createPhotoListTemplate = (photos) => `<div class="event__photos-tape">
  ${photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join('')}
</div>`;

const createNewEventTemplate = (event, isEditing) => {
  const startDay = convertDateWithDay(event.startDate);
  const finishDay = convertDateWithDay(event.finishDate);
  const finishTime = getTime(event.finishDate);
  const startTime = getTime(event.startDate);
  const photosTemplate = createPhotoListTemplate(event.photos);
  const offersTemplate = createOffersTemplate(event.offers, event.type);
  const eventTypesTemplate = createAllEventTypesTemplate();

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    ${eventTypesTemplate}
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${event.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${event.destination}" list="#">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam">Amsterdam</option>
                      <option value="Geneva">Geneva</option>
                      <option value="Chamonix">Chamonix</option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDay} ${startTime}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${finishDay} ${finishTime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">${isEditing ? 'Delete' : 'Cancel'}</button>
                  ${isEditing ? `<button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>`
                  : ``}
                </header>
                <section class="event__details">
                  ${event.offers.length ? `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    ${offersTemplate}
                  </section>`
                : ``}

                  ${event.destination ? `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${event.description}</p>
                    <div class="event__photos-container">
                      ${photosTemplate}
                    </div>
                  </section>`
                : ``}
                </section>
              </form>
            </li>`
};


export default class EditEventView extends SmartView {
  #isEditing = true;

  constructor(event = BLANK_EVENT) {
    super();
    this._data = {...event}
    this.#setInnerHandlers();
  }

  get template() {
    return createNewEventTemplate(this._data, this.#isEditing);
  }

  setSaveButtonHandler = (callback) => {
    this._callback.saveEvent = callback;
    this.element.querySelector('form').addEventListener('submit', this.#handleSaveButtonClick);
  }

  setCancelButtonHandler = (callback) => {
    this._callback.cancelEditEvent = callback;
    if(this.#isEditing) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleCancelButtonClick);
    } else {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#handleCancelButtonClick);
    }
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list')
      .addEventListener('click', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#eventPriceChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('input', this.#eventDestinationChangeHandler);
    this.element.querySelector('#event-start-time-1')
      .addEventListener('input', this.#eventDateStartChangeHandler);
    this.element.querySelector('#event-end-time-1')
      .addEventListener('input', this.#eventDateEndChangeHandler);
    if(this._data.offers.length) {
      this.element.querySelectorAll('.event__offer-checkbox')
      .forEach(element => element
        .addEventListener('click', this.#eventOffersToggleHandler))
    }
  }

  #eventTypeChangeHandler = (e) => {
    e.preventDefault();
    if(!e.target.innerText) {
      return;
    }
    
    this.updateData({type: e.target.innerText}, false)
  }

  #eventOffersToggleHandler = (e) => {
    e.preventDefault();
    if(!e.currentTarget.dataset.offerId) {
      return;
    }
    
    const newOffers = [...this._data.offers].map(offer => {
      if(offer.id === Number(e.currentTarget.dataset.offerId)) {
        offer.checked = !offer.checked;
      }
      return offer
    })
    this.updateData({offers: newOffers}, false)
  }

  #eventPriceChangeHandler = (e) => {
    e.preventDefault();

    if(!e.target.value || isNaN(Number(e.target.value))) {
      return;
    }
    
    this.updateData({price: e.target.value}, true)
  }
  
  #eventDestinationChangeHandler = (e) => {
    e.preventDefault();

    if(!e.target.value) {
      return;
    }
    
    this.updateData({destination: e.target.value}, true)
  }

  #eventDateStartChangeHandler = (e) => {
    e.preventDefault();

    if(!e.target.value) {
      return;
    }
    
    this.updateData({startDate: e.target.value}, true)
  }
  #eventDateEndChangeHandler = (e) => {
    e.preventDefault();

    if(!e.target.value) {
      return;
    }
    
    this.updateData({finishDate: e.target.value}, true)
  }

  #handleSaveButtonClick = (e) => {
    e.preventDefault();
    this._callback.saveEvent(this._data);
  }

  #handleCancelButtonClick = (e) => {
    e.preventDefault();
    this._callback.cancelEditEvent();
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCancelButtonHandler(this._callback.cancelEditEvent)
    this.setSaveButtonHandler(this._callback.saveEvent)
  }
}
