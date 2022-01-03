import EventItemView from 'view/event-item-view';
import EditEventView from 'view/edit-event-view';
import { render, RenderPosition, replace, Mode, remove, UserAction, UpdateType } from 'utils';

export default class EventPresenter {
  #container = null;
  #event = null;
  #eventElementView = null;
  #newEventElementView = null;
  #handleChange = null;
  #changeMode = null;
  #deleteEvent = null;
  #mode = Mode.DEFAULT;

  constructor(container, handleChange, changeMode, deleteEvent) {
    this.#container = container;
    this.#handleChange = handleChange;
    this.#changeMode = changeMode;
    this.#deleteEvent = deleteEvent;
  }

  init = (event) => {
    this.#event = event;
    const prevEventView = this.#eventElementView;
    const prevEventEditView = this.#newEventElementView;

    this.#eventElementView = new EventItemView(event);
    this.#newEventElementView = new EditEventView(true, event);

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

  #removeCard = () => {
    const parent = this.#newEventElementView.element.parentElement;
    parent.removeChild(this.#newEventElementView.element);
    this.#mode = Mode.DEFAULT;
  };

  #handleFavoriteClick = () => {
    this.#handleChange(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {...this.#event, isFavorite: !this.#event.isFavorite});
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
      const isPriceDifferent = this.#event.price !== event.price;
      const isDateDifferent = this.#event.startDate !== event.startDate || this.#event.finishDate !== event.finishDate;
      const isDestinationDifferent = this.#event.destination !== event.destination;
      const updateType = isPriceDifferent || isDateDifferent || isDestinationDifferent ? UpdateType.MAJOR : UpdateType.MINOR;

      this.#handleChange(
        UserAction.UPDATE_EVENT,
        updateType,
        event);
      this.#replaceFormToCard();
    });

    this.#newEventElementView.setDeleteButtonHandler((event) => {
      this.#deleteEvent(
        UserAction.REMOVE_EVENT,
        UpdateType.MINOR,
        event);
      this.#removeCard();
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
