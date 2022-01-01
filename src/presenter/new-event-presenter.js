import { nanoid } from 'nanoid';
import EditEventView from 'view/edit-event-view';
import { render, RenderPosition, remove } from 'utils';

export default class NewEventPresenter {
  #container = null;
  #handleAddNewEvent = null;
  #newEventElementView = null;

  constructor(container, handleAddNewEvent) {
    this.#container = container;
    this.#handleAddNewEvent = handleAddNewEvent;
  }

  init = () => {
    if (this.#newEventElementView !== null) {
      return;
    }

    this.#newEventElementView = new EditEventView(false);

    render(this.#container, this.#newEventElementView, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#handleEscKeyDown);
    this.#setHandlers()
  }

  #handleEscKeyDown = (e) => {
    if(e.key === 'Esc' || e.key === 'Escape') {
      e.preventDefault();
      this.destroy();
    }
  };

  #handleCancelClick = () => {
    this.destroy();
  }

  #setHandlers = () => {
    this.#newEventElementView.setSaveButtonHandler((event) => {
      this.#handleAddNewEvent(
        {...event, id: nanoid(3)},
      );
  
      this.destroy();
    });

    this.#newEventElementView.setCancelButtonHandler(() => {
      this.#handleCancelClick()
    });

  }

  destroy = () => {
    if (this.#newEventElementView === null) {
      return;
    }
    remove(this.#newEventElementView);
    this.#newEventElementView = null;

    document.removeEventListener('keydown', this.#handleEscKeyDown);
  }
}
