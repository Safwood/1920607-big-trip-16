import {UserAction, UpdateType} from 'utils';
import EditEventView from 'view/edit-event-view';
import { render, RenderPosition, remove } from 'utils';

export default class NewEventPresenter {
  #container = null;
  #handleAddNewEvent = null;
  #newEventView = null;
  #closeCallback = null;
  #allOffers = null;
  #allDestinations = null;

  constructor(allOffers, allDestinations, container, handleAddNewEvent, closeCallback) {
    this.#container = container;
    this.#handleAddNewEvent = handleAddNewEvent;
    this.#closeCallback = closeCallback;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
  }

  init = () => {
    if (this.#newEventView !== null) {
      return;
    }

    this.#newEventView = new EditEventView(this.#allOffers, this.#allDestinations, false);

    render(this.#container, this.#newEventView, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#handleEscKeyDown);
    this.#setHandlers();
  }

  setSaving = () => {
    this.#newEventView.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#newEventView.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newEventView.shake(resetFormState);
  }

  #handleEscKeyDown = (e) => {
    if(e.key === 'Esc' || e.key === 'Escape') {
      e.preventDefault();
      this.destroy();
      document.querySelector('.trip-main__event-add-btn').removeAttribute('disabled', '');
      this.#closeCallback(e);
    }
  };

  #handleCancelClick = () => {
    this.destroy();
    document.querySelector('.trip-main__event-add-btn').removeAttribute('disabled', '');
    this.#closeCallback();
  }

  #setHandlers = () => {
    this.#newEventView.setSaveButtonHandler((event) => {
      this.#handleAddNewEvent(
        UserAction.ADD_EVENT,
        UpdateType.MAJOR,
        {...event},
      );
    });

    this.#newEventView.setCancelButtonHandler(() => {
      this.#handleCancelClick();
    });

  }

  destroy = () => {
    if (this.#newEventView === null) {
      return;
    }
    remove(this.#newEventView);
    this.#newEventView = null;

    document.removeEventListener('keydown', this.#handleEscKeyDown);
  }
}
