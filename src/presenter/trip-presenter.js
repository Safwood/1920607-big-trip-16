import SiteMenuView from 'view/site-menu-view';
import TripFilterView from 'view/trip-filter-view';
import TripInfoView from 'view/trip-info-view';
import EventListView from 'view/event-list-view';
import NoEventView from 'view/no-event-view';
import { countTotalSum, render, RenderPosition, sort, SortingType } from 'utils';
import EventPresenter from 'presenter/event-presenter';
import NewEventPresenter from 'presenter/new-event-presenter';
import SortingPresenter from 'presenter/sorting-presenter';

export default class TripPresenter {
  #pointsModel = null;
  #totalPrice = null;
  #menuContainer = null;
  #tripFilterContainer = null;
  #tripMain = null;
  #tripEvents = null;
  #tripInfoView = null;
  #tripEventsList = null;
  #sortingPresenter = null;
  #sortType = SortingType.DAY;
  #eventPresenters = new Map();

  #siteMenuView = new SiteMenuView();
  #tripFilterView = new TripFilterView()
  #eventListView = new EventListView();
  #noEventView = new NoEventView();

  constructor(pointsModel, menuContainer, tripFilterContainer, tripMain, tripEvents) {
    this.#menuContainer = menuContainer;
    this.#tripFilterContainer = tripFilterContainer;
    this.#tripMain = tripMain;
    this.#tripEvents = tripEvents;
    this.#pointsModel = pointsModel;
  }

  get events() {
    return sort(this.#pointsModel.events, this.#sortType)
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
  
  #handleEventAdd = (addedEvent) => {
    this.#pointsModel.addEvent(addedEvent);
    this.#clearEventList()
    this.#renderEvents()
  }

  #handleEventChange = (updatedEvent) => {
    this.#pointsModel.changeEvent(updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  }

  #handleEventDelete = (deletedEvent) => {
    this.#pointsModel.removeEvent(deletedEvent);
    this.#eventPresenters.get(deletedEvent.id).destroy();
    this.#eventPresenters.delete(deletedEvent.id);
  }

  #renderEventListView = () => {
    render(this.#tripEvents, this.#eventListView, RenderPosition.BEFORREEND);
    this.#tripEventsList = document.querySelector('.trip-events__list');
  }

  #renderSiteMenuView = () => {
    render(this.#menuContainer, this.#siteMenuView, RenderPosition.AFTERBEGIN);
  }

  #setAddEventButtonHandler = () => {
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
      const newEventPresenter = new NewEventPresenter(this.#tripEventsList, this.#handleEventAdd)
      newEventPresenter.init()
    })
  }

  #renderTripFilterView = () => {
    render(this.#tripFilterContainer, this.#tripFilterView, RenderPosition.AFTERBEGIN);
  }

  #renderTripInfoView = () => {
    render(this.#tripMain, this.#tripInfoView, RenderPosition.AFTERBEGIN);
  }

  #renderTripSortingView = () => {
    this.#sortingPresenter = new SortingPresenter(this.#handleSortTypeChange, this.#sortType);
    this.#sortingPresenter.init(this.#tripEvents);
  }

  #handleSortTypeChange = (sortingType) => {
    if(this.#sortType === sortingType) {
      return
    }
    
    this.#sortType = sortingType;
    this.#clearEventList();
    this.#clearSorting();
    this.#renderTripSortingView();
    this.#renderEvents();
  }

  #renderNoEventView = () => {
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
    this.#renderTripSortingView();
    this.#renderTripFilterView();
    this.#renderSiteMenuView();
    this.#renderTripInfoView();
    this.#renderEvents();
    this.#setAddEventButtonHandler();
  }

  #clearEventList = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #clearSorting = () => {
    this.#sortingPresenter.destroy();
  }
}
