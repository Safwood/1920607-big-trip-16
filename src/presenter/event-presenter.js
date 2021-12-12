import EventItemView from 'view/trip-event-item';
import TripNewEventView from 'view/trip-new-point-without-destination';
import { render, RenderPosition } from 'utils';

export default class EventPresenter {
  #container = null;
  #eventElementView = null;
  #newEventElementView = null;

  constructor(container) {
    this.#container = container;
  }

  init = (event) => {
    this.#eventElementView = new EventItemView(event);
    this.#newEventElementView = new TripNewEventView(event);

    this.#renderEvent();
    this.#setHandlers();
  }

  #replaceCardToForm = () => {
    this.#container.replaceChild(this.#newEventElementView.element, this.#eventElementView.element);
  };

  #replaceFormToCard = () => {
    this.#container.replaceChild(this.#eventElementView.element, this.#newEventElementView.element);
  };

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
    
    this.#newEventElementView.setSaveButtonHandler(() => {
      this.#replaceFormToCard();
    });

    this.#newEventElementView.setCancelButtonHandler(this.#replaceFormToCard);
  }

  #renderEvent = () => {
    render(this.#container, this.#eventElementView, RenderPosition.BEFORREEND);
  }
};
