import TripInfoView from 'view/trip-info-view';
import EventListView from 'view/event-list-view';
import NoEventView from 'view/no-event-view';
import { countTotalSum, render, RenderPosition, sort, SortingType, UserAction, UpdateType, filter, remove, FilterType } from 'utils';
import EventPresenter from 'presenter/event-presenter';
import NewEventPresenter from 'presenter/new-event-presenter';

export default class TripPresenter {
  #pointsModel = null;
  #filterModel = null;
  #sortingModel = null;
  #totalPrice = null;
  #tripMain = null;
  #tripEvents = null;
  #tripInfoView = null;
  #tripEventsList = null;
  #filterType = FilterType.EVERYTHING;
  #eventPresenters = new Map();

  #eventListView = new EventListView();
  #noEventView = null;

  constructor(pointsModel, tripMain, tripEvents, filterModel, sortingModel) {
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#sortingModel = sortingModel;
    this.#tripMain = tripMain;
    this.#tripEvents = tripEvents;
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#sortingModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const filteredEvents = filter[this.#filterType](this.#pointsModel.events);
    return sort(filteredEvents, this.#sortingModel.sortType);
  }

  init = () => {
    this.#totalPrice = countTotalSum(this.events);
    this.#tripInfoView = new TripInfoView(this.#totalPrice);
    this.#renderEventListView();
    this.#renderPageContent();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  }

  #handleModelEvent = (updateType, updatedEvent) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList();
        this.#renderEvents();
        break;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#pointsModel.changeEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#pointsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#pointsModel.removeEvent(updateType, update);
        break;
    }
  }

  #handleEventAdd = (actionType, updateType, addedEvent) => {
    this.#handleViewAction(actionType, updateType, addedEvent);
    document.querySelector('.trip-main__event-add-btn').removeAttribute('disabled', '');
  }

  #handleEventChange = (actionType, updateType, updatedEvent) => {
    this.#handleViewAction(actionType, updateType, updatedEvent);
  }

  #handleEventDelete = (actionType, updateType, deletedEvent) => {
    this.#handleViewAction(actionType, updateType, deletedEvent);
    this.#eventPresenters.get(deletedEvent.id).destroy();
    this.#eventPresenters.delete(deletedEvent.id);
  }

  #renderEventListView = () => {
    render(this.#tripEvents, this.#eventListView, RenderPosition.BEFORREEND);
    this.#tripEventsList = document.querySelector('.trip-events__list');
  }

  openAddEventForm = (callback) => {
    document.querySelector('.trip-main__event-add-btn').setAttribute('disabled', '');
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
    this.#sortingModel.setSortType(UpdateType.MINOR, SortingType.DAY);
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    const newEventPresenter = new NewEventPresenter(this.#tripEventsList, this.#handleEventAdd, callback);
    newEventPresenter.init();
  }

  #renderTripInfoView = () => {
    render(this.#tripMain, this.#tripInfoView, RenderPosition.AFTERBEGIN);
  }

  #renderNoEventView = () => {
    this.#noEventView = new NoEventView(this.#filterType);
    render(this.#tripEvents, this.#noEventView, RenderPosition.BEFORREEND);
  }

  #renderEvents = () => {
    if(!this.events.length) {
      this.#renderNoEventView();
    }

    for(const event of this.events) {
      const eventPresenter = new EventPresenter(this.#tripEventsList, this.#handleEventChange, this.#handleModeChange, this.#handleEventDelete);
      eventPresenter.init(event);
      this.#eventPresenters.set(event.id, eventPresenter);
    }
  }

  #renderPageContent = () => {
    this.#renderTripInfoView();
    this.#renderEvents();
  }

  #clearEventList = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (this.#noEventView) {
      remove(this.#noEventView);
    }
  }
}
