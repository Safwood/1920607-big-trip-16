import AbstractView from './abstract-view';

const createTripInfoTemplate = (totalPrice) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`
);

export default class TripInfoView extends AbstractView {
  #totalPrice = null;

  constructor(totalPrice) {
    super();
    this.#totalPrice = totalPrice;
  }

  get template() {
    return createTripInfoTemplate(this.#totalPrice);
  }

}