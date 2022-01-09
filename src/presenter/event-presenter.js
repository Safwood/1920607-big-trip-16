import EventItemView from 'view/event-item-view';
import EditEventView from 'view/edit-event-view';
import { State } from 'utils';
import { render, RenderPosition, replace, Mode, remove, UserAction, UpdateType } from 'utils';

export default class EventPresenter {
  #container = null;
  #event = null;
  #eventView = null;
  #editEventView = null;
  #handleChange = null;
  #changeMode = null;
  #deleteEvent = null;
  #allOffers = [];
  #allDestinations = [];
  #mode = Mode.DEFAULT;

  constructor(allOffers, allDestinations, container, handleChange, changeMode, deleteEvent) {
    this.#container = container;
    this.#handleChange = handleChange;
    this.#changeMode = changeMode;
    this.#deleteEvent = deleteEvent;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
  }

  init = (event) => {
    this.#event = event;
    const prevEventView = this.#eventView;
    const prevEventEditView = this.#editEventView;

    this.#eventView = new EventItemView(event);
    this.#editEventView = new EditEventView(this.#allOffers, this.#allDestinations, true, event);

    this.#setHandlers();
    if(prevEventView === null || prevEventEditView === null) {
      this.#renderEvent();
      return;
    }

    if(this.#container.contains(prevEventView.element)) {
      replace(this.#eventView.element, prevEventView.element);
    }
    if(this.#container.contains(prevEventEditView.element)) {
      replace(this.#eventView.element, prevEventEditView.element);
      this.#mode = Mode.DEFAULT;
    }
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this.#editEventView.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this.#editEventView.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this.#editEventView.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this.#editEventView.shake(resetFormState);
        break;
    }
  }

  #replaceCardToForm = () => {
    replace(this.#editEventView.element, this.#eventView.element);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#eventView.element, this.#editEventView.element);
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
    this.#eventView.setEditClickHandler(() => {
      this.#replaceCardToForm();
      document.addEventListener('keydown', this.#handleEscKeyDown);
    });

    this.#eventView.setFavoriteClickHandler(() =>
      this.#handleFavoriteClick()
    );

    this.#editEventView.setSaveButtonHandler((event) => {
      const isPriceDifferent = this.#event.price !== event.price;
      const isDateDifferent = this.#event.startDate !== event.startDate || this.#event.finishDate !== event.finishDate;
      const isDestinationDifferent = this.#event.destination !== event.destination;
      const updateType = isPriceDifferent || isDateDifferent || isDestinationDifferent ? UpdateType.MAJOR : UpdateType.MINOR;

      this.#handleChange(
        UserAction.UPDATE_EVENT,
        updateType,
        event);
    });

    this.#editEventView.setDeleteButtonHandler((event) => {
      this.#deleteEvent(
        UserAction.DELETE_EVENT,
        UpdateType.MAJOR,
        event);
    });

    this.#editEventView.setCancelButtonHandler(this.#replaceFormToCard);
  }

  #renderEvent = () => {
    render(this.#container, this.#eventView, RenderPosition.BEFORREEND);
  }

  destroy = () => {
    remove(this.#eventView);
    remove(this.#editEventView);
  }
}
