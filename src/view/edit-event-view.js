import SmartView from './smart-view';
import { BLANK_EVENT, eventTypes } from 'utils';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const isOfferChecked = (offerType, checkedOffers) => checkedOffers.some((offer) => offer.title === offerType.title);

const createOffersTemplate = (checkedOffers, type, currentOffers, isDisabled) => `<div class="event__available-offers">
  ${currentOffers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" data-offer-id="${offer.id}" id="event-offer-${type}-${offer.id}" type="checkbox" name="event-offer-${type}" ${isOfferChecked(offer, checkedOffers) ? 'checked' : ''}  ${isDisabled ? 'disabled' : ''}>
      <label class="event__offer-label"  for="event-offer-${type}-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('')}
</div>`;

const createAllDestinationsTemplate = (destinations, currentDestination, eventType, isDisabled) =>
  `<div class="event__field-group  event__field-group--destination">
  <label class="event__label  event__type-output" for="event-destination-${currentDestination}">
    ${eventType}
  </label>
  <select class="event__input  event__input--destination" id="event-destination-${currentDestination}" name="event-destination" value="${currentDestination}"  ${isDisabled ? 'disabled' : ''}>
  <option value=''></option>
    ${destinations.map((destination) => `<option value='${destination.name}' ${destination.name === currentDestination ? 'selected' : ''}>${destination.name}</option>`).join('')}
  </select>
</div>`;

const createAllEventTypesTemplate = () =>
  `<div class="event__type-list">
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${eventTypes.map((event) => `<div class="event__type-item">
    <input id="event-type-${event.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${event.toLowerCase()}>
    <label class="event__type-label  event__type-label--${event.toLowerCase()}" for="event-type-${event.toLowerCase()}-1">${event}</label>
    </div>`).join('')}
  </fieldset>
</div>`;

const createPhotoListTemplate = (photos = []) => {
  if(photos.length) {
    return `<div class="event__photos-tape">
    ${photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
  </div>`;
  }
  return '';
};

const createNewEventTemplate = (event, isEditing, allDestinations, currentOffers = [], currentPointDescription = {}) => {
  const { isError, isDisabled, type, offers, price, isSaving, isDeleting } = event;
  const { pictures, name, description } = currentPointDescription;
  const photosTemplate = createPhotoListTemplate(pictures);
  const offersTemplate = createOffersTemplate(offers, type, currentOffers, isDisabled);
  const eventTypesTemplate = createAllEventTypesTemplate();
  const destinationsTemplate = createAllDestinationsTemplate(allDestinations, name, type, isDisabled);
  const deleteButton = isDeleting ? 'Deleting...' : 'Delete';
  const errorText = 'All fields must must be filled in. Price can\'t be 0.';

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
                    ${eventTypesTemplate}
                  </div>

                  ${destinationsTemplate}

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=""  ${isDisabled ? 'disabled' : ''}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=""  ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${price}"  ${isDisabled ? 'disabled' : ''}>
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
                <button class="event__reset-btn" type="reset">${isEditing ? deleteButton : 'Cancel'}</button>
                ${isEditing ? `<button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>`
    : ''}
              </header>

              <section class="event__errors">
                <div class="event__error" style="visibility: ${isError ? 'visible' : 'hidden'}">${errorText}</div>
              </section>

              <section class="event__details">
                ${currentOffers.length ? `<section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  ${offersTemplate}
                </section>`
    : ''}

    ${description ?
    `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
        ${photosTemplate}
        </div>
        </section>
      </section>`
    : ''}
    </form>
  </li>`;
};

export default class EditEventView extends SmartView {
  #isEditing = true;
  #allOffers = null;
  #currentOffers = null;
  #allDestinations = null;
  #currentPointDescription = null;

  constructor(allOffers, allDestinations, isEditing, event = BLANK_EVENT) {
    super();
    this.#isEditing = isEditing;
    this._data = EditEventView.parseEventToData(event);
    this.#allOffers = allOffers;
    this.#currentOffers = ((allOffers).filter((offer) => offer.type === (this._data.type).toLowerCase()))[0].offers;
    this.#allDestinations = allDestinations;
    this.#currentPointDescription = allDestinations.filter((destination) => destination.name === this._data.destination)[0];
    this.#setDatePickers();
    this.#setInnerHandlers();
  }

  get template() {
    return createNewEventTemplate(this._data, this.#isEditing, this.#allDestinations, this.#currentOffers, this.#currentPointDescription);
  }

  static parseEventToData = (event) => ({...event,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
    isError: false,
  });

  static parseDataToEvent = (data) => {
    const event = {...data};

    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;
    delete event.isError;

    return event;
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

  setDeleteButtonHandler = (callback) => {
    if(!this.#isEditing) {
      return;
    }
    this._callback.deleteEvent = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#handleDeleteButtonClick);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list')
      .addEventListener('click', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#eventPriceChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('input', this.#eventDestinationChangeHandler);
    const offerInputs = this.element.querySelectorAll('.event__offer-checkbox');

    if(!offerInputs) {
      return;
    }

    offerInputs.forEach((element) => element.addEventListener('click', this.#eventOffersToggleHandler));
  }

  #eventTypeChangeHandler = (e) => {
    e.preventDefault();
    if(!e.target.innerText) {
      return;
    }
    this.#currentOffers = ((this.#allOffers).filter((offer) => offer.type === (e.target.innerText).toLowerCase()))[0].offers;

    this.updateData({type: e.target.innerText, offers: []}, false);
  }

  #eventOffersToggleHandler = (e) => {
    e.preventDefault();
    if(!e.currentTarget.dataset.offerId) {
      return;
    }
    let newOffers;
    if(this._data.offers.some((offer) => offer.id === Number(e.currentTarget.dataset.offerId))) {
      newOffers = [...this._data.offers].filter((offer) => {
        if(offer.id !== Number(e.currentTarget.dataset.offerId)) {
          return offer;
        }
      });
    } else {
      const newOffer = this.#currentOffers.find((offer) => offer.id === Number(e.currentTarget.dataset.offerId));
      if(!newOffer) {
        newOffers = [...this._data.offers];
      } else {
        newOffers = [...this._data.offers, newOffer];
      }
    }

    this.updateData({offers: newOffers}, false);
  }

  #eventPriceChangeHandler = (e) => {
    e.preventDefault();

    if(!e.target.value || isNaN(Number(e.target.value))) {
      return;
    }

    this.updateData({price: String(Number(e.target.value))}, true);
  }

  #eventDestinationChangeHandler = (e) => {
    e.preventDefault();

    if(!e.target.value) {
      return;
    }

    this.#currentPointDescription = (this.#allDestinations.filter((destination) => destination.name === e.target.value))[0];

    this.updateData({destination: e.target.value, description: this.#currentPointDescription.description, photos: this.#currentPointDescription.pictures}, false);
  }

  #handleSaveButtonClick = (e) => {
    e.preventDefault();
    this._callback.saveEvent(EditEventView.parseDataToEvent(this._data));
  }

  #handleCancelButtonClick = (e) => {
    e.preventDefault();
    this._callback.cancelEditEvent();
  }

  #handleDeleteButtonClick = (e) => {
    e.preventDefault();
    this._callback.deleteEvent(EditEventView.parseDataToEvent(this._data));
  }

  #handleDateStartChange = (data) => {
    if(!this._data.finishDate || dayjs(this._data.finishDate).diff(data[0]) > 0) {
      this.updateData({startDate: data[0]}, true);
    } else {
      this.updateData({startDate: this._data.finishDate}, false);
    }
  }

  #handleDateEndChange = (data) => {
    if(!this._data.startDate || dayjs(data[0]).diff(this._data.startDate) > 0) {
      this.updateData({finishDate: data[0]}, true);
    } else {
      this.updateData({finishDate: this._data.startDate}, false);
    }
  }

  #setDatePickers = () => {
    const dateStartContainer = this.element.querySelector('#event-start-time-1');
    const dateEndContainer = this.element.querySelector('#event-end-time-1');
    flatpickr(dateStartContainer, {
      onChange: this.#handleDateStartChange,
      dateFormat: 'd/m/y H/i',
      enableTime: true,
      defaultDate: this._data.startDate,
    });
    flatpickr(dateEndContainer, {
      onChange: this.#handleDateEndChange,
      dateFormat: 'd/m/y H/i',
      enableTime: true,
      defaultDate: this._data.finishDate,
    });
  }

  restoreHandlers = () => {
    this.#setDatePickers();
    this.#setInnerHandlers();
    this.setCancelButtonHandler(this._callback.cancelEditEvent);
    this.setSaveButtonHandler(this._callback.saveEvent);
  }
}
