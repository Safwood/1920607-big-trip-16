import EventItemView from 'view/trip-event-item';
import TripNewEventView from 'view/trip-new-point-without-destination';
import { render, RenderPosition } from 'utils';

export default class EventPresenter {
  #container = null;
  #event = null;
  #eventElementView = null;
  #newEventElementView = null;
  #handleChange = null;

  constructor(container, handleChange) {
    this.#container = container;
    this.#handleChange = handleChange;
  }

  init = (event) => {
    this.#event = event;
    const prevEventView = this.#eventElementView;
    const prevEventEditView = this.#newEventElementView;

    this.#eventElementView = new EventItemView(event);
    this.#newEventElementView = new TripNewEventView(event);

    this.#setHandlers();
    if(prevEventView === null || prevEventEditView === null) {
      this.#renderEvent();
      return;
    }

    if(this.#container.contains(prevEventView.element)) {
      this.#container.replaceChild(this.#eventElementView.element, prevEventView.element);
    }
  }

  #replaceCardToForm = () => {
    this.#container.replaceChild(this.#newEventElementView.element, this.#eventElementView.element);
  };

  #replaceFormToCard = () => {
    this.#container.replaceChild(this.#eventElementView.element, this.#newEventElementView.element);
  };

  #handleFavoriteClick = () => {
    this.#handleChange({...this.#event, isFavorite: !this.#event.isFavorite});
  }

  #handleEscKeyDown = (e) => {
    if(e.key === 'Esc' || e.key === 'Escape') {
      e.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#handleEscKeyDown);
    }
  };

  #setHandlers = () => {
    this.#eventElementView.setEditClickHandler(() => {
      this.#replaceCardToForm();
      document.addEventListener('keydown', this.#handleEscKeyDown);
    });

    this.#eventElementView.setFavoriteClickHandler(() =>
      this.#handleFavoriteClick()
    );

    this.#newEventElementView.setSaveButtonHandler(() => {
      this.#replaceFormToCard();
    });

    this.#newEventElementView.setCancelButtonHandler(this.#replaceFormToCard);
  }

  #renderEvent = () => {
    render(this.#container, this.#eventElementView, RenderPosition.BEFORREEND);
  }

  destroy = () => {
    this.eventElementView = null;
    this.newEventElementView = null;
  }
}
