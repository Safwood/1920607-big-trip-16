import SiteMenuView from 'view/site-menu-view';
import TripFilterView from 'view/trip-filter-view';
import TripInfoView from 'view/trip-info-view';
import EventListView from 'view/event-list-view';
import NoEventView from 'view/no-event-view';
import { countTotalSum, render, RenderPosition, updateItem, sort, SortingType, removeElement } from 'utils';
import EventPresenter from 'presenter/event-presenter';
import SortingPresenter from 'presenter/sorting-presenter';

export default class TripPresenter {
  #events = null;
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

  constructor(menuContainer, tripFilterContainer, tripMain, tripEvents) {
    this.#menuContainer = menuContainer;
    this.#tripFilterContainer = tripFilterContainer;
    this.#tripMain = tripMain;
    this.#tripEvents = tripEvents;
  }


  init = (events) => {
    this.#events = [...events];
    this.#totalPrice = countTotalSum(events);
    this.#tripInfoView = new TripInfoView(this.#totalPrice);

    this.#renderEventListView();
    this.#renderPageContent();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  }

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  }

  #handleEventDelete = (deletedEvent) => {
    this.#events = removeElement(this.#events, deletedEvent);
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
    this.#sortType = sortingType;
    this.#clearEventList();
    this.#clearSorting();
    this.#events = sort(this.#events, sortingType);
    this.#renderTripSortingView();
    this.#renderEvents();
  }

  #renderNoEventView = () => {
    render(this.#tripEvents, this.#noEventView, RenderPosition.BEFORREEND);
  }

  #renderEvents = () => {
    if(!this.#events.length) {
      this.#renderNoEventView();
    }

    for(const event of this.#events) {
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
  }

  #clearEventList = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #clearSorting = () => {
    this.#sortingPresenter.destroy();
  }
}
