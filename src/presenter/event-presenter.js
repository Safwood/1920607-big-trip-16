import EventItemView from 'view/trip-event-item';
import TripNewEventView from 'view/trip-new-point-without-destination';
import { render, RenderPosition, replace, Mode, remove } from 'utils';

export default class EventPresenter {
  #container = null;
  #event = null;
  #eventElementView = null;
  #newEventElementView = null;
  #handleChange = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;

  constructor(container, handleChange, changeMode) {
    this.#container = container;
    this.#handleChange = handleChange;
    this.#changeMode = changeMode;
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
      replace(this.#eventElementView.element, prevEventView.element);
    }
    if(this.#container.contains(prevEventEditView.element)) {
      replace(this.#newEventElementView.element, prevEventEditView.element);
    }
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm = () => {
    replace(this.#newEventElementView.element, this.#eventElementView.element);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#eventElementView.element, this.#newEventElementView.element);
    this.#mode = Mode.DEFAULT;
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

    this.#newEventElementView.setSaveButtonHandler((event) => {
      this.#handleChange(event);
      this.#replaceFormToCard();
    });

    this.#newEventElementView.setCancelButtonHandler(this.#replaceFormToCard);
  }

  #renderEvent = () => {
    render(this.#container, this.#eventElementView, RenderPosition.BEFORREEND);
  }

  destroy = () => {
    remove(this.#eventElementView);
    remove(this.#newEventElementView);
  }
}
