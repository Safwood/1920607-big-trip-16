import TripInfoView from 'view/trip-info-view';
import EventListView from 'view/event-list-view';
import NoEventView from 'view/no-event-view';
import {
  countTotalSum,
  render,
  RenderPosition,
  sort,
  SortingType,
  UserAction,
  UpdateType,
  filter,
  remove,
  FilterType,
  State,
  getEventRoute,
  getEventDates,
  InnerEventState
} from 'utils';
import EventPresenter from 'presenter/event-presenter';
import NewEventPresenter from 'presenter/new-event-presenter';
import LoadingView from 'view/loading-view.js';

export default class TripPresenter {
  #pointsModel = null;
  #filterModel = null;
  #sortingModel = null;
  #totalPrice = null;
  #route = null;
  #eventDates = null;
  #tripMain = null;
  #tripEvents = null;
  #tripInfoView = null;
  #tripEventsList = null;
  #noEventView = null;
  #handleNewEventFormClose = null;
  #filterType = FilterType.EVERYTHING;
  #eventPresenters = new Map();
  #loadingView = new LoadingView();
  #eventListView = new EventListView();
  #isLoading = true;
  #newEventPresenter;
  #innerEventState = InnerEventState.UNBLOCKED;

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
    const events = this.#pointsModel.events;
    if(!events) {
      return [];
    }
    const filteredEvents = filter[this.#filterType](events);
    const sortedEvents = sort(filteredEvents, this.#sortingModel.sortType);
    return sortedEvents;
  }

  get allOffers() {
    const offers = this.#pointsModel.allOffers;
    if(!offers) {
      return [];
    }
    return offers;
  }

  get allDestinations() {
    const destinations = this.#pointsModel.allDestinations;
    if(!destinations) {
      return [];
    }

    return destinations;
  }

  init = (handleNewEventFormClose) => {
    this.#handleNewEventFormClose = handleNewEventFormClose;
    this.#renderEventListView();
    this.#countTotalSum();
    this.#getRoute();
    this.#getEventDates();
    this.#renderPageContent();
  }

  #blockEvents = () => {
    this.#innerEventState = InnerEventState.BLOCKED;
    this.#eventPresenters.forEach((presenter) => {
      presenter.blockEventHandlers();
    });
  }

  unblockEvents = () => {
    this.#innerEventState = InnerEventState.UNBLOCKED;
    this.#eventPresenters.forEach((presenter) => {
      presenter.unblockEventHandlers();
    });
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
        this.clearEventList();
        this.renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearPageContent();
        this.#countTotalSum();
        this.#getRoute();
        this.#getEventDates();
        this.#renderPageContent();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#clearPageContent();
        this.#countTotalSum();
        this.#getRoute();
        this.#getEventDates();
        this.#renderPageContent();
        break;
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setViewState(State.SAVING);
        try {
          await this.#pointsModel.changeEvent(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setViewState(State.ABORTING);
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          if(!update.destination || !update.price || !update.finishDate || !update.startDate) {
            this.#newEventPresenter.setAborting();
          } else {
            await this.#pointsModel.addEvent(updateType, update);
            this.#newEventPresenter.destroy();
            this.#handleNewEventFormClose();
          }
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }

        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setViewState(State.DELETING);
        try {
          await this.#pointsModel.removeEvent(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setViewState(State.ABORTING);
        }
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

  openAddEventForm = () => {
    document.querySelector('.trip-main__event-add-btn').setAttribute('disabled', '');
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
    this.#sortingModel.setSortType(UpdateType.MINOR, SortingType.DAY);
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter = new NewEventPresenter(this.allOffers, this.allDestinations, this.#tripEventsList, this.#handleEventAdd, this.#handleNewEventFormClose);
    this.#newEventPresenter.init();
    this.#blockEvents();
  }

  #renderLoading = () => {
    render(this.#tripEvents, this.#loadingView, RenderPosition.AFTERBEGIN);
  }

  #countTotalSum = () => {
    if(this.events.length) {
      this.#totalPrice = countTotalSum(this.events);
    }
  }

  #getRoute = () => {
    if(this.events.length) {
      this.#route = getEventRoute(this.events);
    }
  }

  #getEventDates = () => {
    if(this.events.length) {
      this.#eventDates = getEventDates(this.events);
    }
  }

  #renderTripInfoView = () => {
    this.#tripInfoView = new TripInfoView(this.#totalPrice, this.#route, this.#eventDates);
    render(this.#tripMain, this.#tripInfoView, RenderPosition.AFTERBEGIN);
  }

  #renderNoEventView = () => {
    this.#noEventView = new NoEventView(this.#filterType);
    render(this.#tripEvents, this.#noEventView, RenderPosition.BEFORREEND);
  }

  renderEvents = () => {
    if(this.#noEventView) {
      remove(this.#noEventView);
    }

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if(!this.events || !this.events.length) {
      this.#renderNoEventView();
      return;
    }

    for(const event of this.events) {
      const eventPresenter = new EventPresenter(this.allOffers, this.allDestinations, this.#tripEventsList, this.#handleEventChange, this.#handleModeChange, this.#handleEventDelete, this.#innerEventState);
      eventPresenter.init(event);
      this.#eventPresenters.set(event.id, eventPresenter);
    }
  }

  #renderPageContent = () => {
    this.#renderTripInfoView();
    this.renderEvents();
  }

  #clearPageContent = () => {
    remove(this.#tripInfoView);
    this.clearEventList();
  }

  clearEventList = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (this.#loadingView) {
      remove(this.#loadingView);
    }

    if (this.#noEventView) {
      remove(this.#noEventView);
    }
  }
}
