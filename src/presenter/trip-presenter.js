import SiteMenuView from 'view/site-menu-view';
import TripFilterView from 'view/trip-filter-view';
import TripInfoView from 'view/trip-info-view';
import TripSortingView from 'view/trip-sorting-view';
import EventListView from 'view/trip-event-list';
import NoEventView from 'view/no-event-view';
import { countTotalSum, render, RenderPosition } from 'utils';
import EventPresenter from 'presenter/event-presenter';


export default class TripPresenter {
  #events = null;
  #totalPrice = null;
  #menuContainer = null;
  #tripFilterContainer = null;
  #tripMain = null;
  #tripEvents = null;
  #tripInfoView = null;
  #tripEventsList = null;
  
  #siteMenuView = new SiteMenuView();
  #tripFilterView = new TripFilterView()
  #tripSortingView = new TripSortingView();
  #eventListView = new EventListView();
  #noEventView = new NoEventView();

  constructor(menuContainer, tripFilterContainer, tripMain, tripEvents) {
    this.#menuContainer = menuContainer;
    this.#tripFilterContainer = tripFilterContainer;
    this.#tripMain = tripMain;
    this.#tripEvents = tripEvents;
  }
  

  init = (events) => {
    this.#events = events;
    this.#totalPrice = countTotalSum(events);
    this.#tripInfoView = new TripInfoView(this.#totalPrice);

    this.#renderEventListView();
    this.#renderPageContent()
  }
  
  #renderEventListView = () => {
    render(this.#tripEvents, this.#eventListView, RenderPosition.BEFORREEND);
    this.#tripEventsList = document.querySelector('.trip-events__list');
  }

  #renderSiteMenuView = () => {
    render(this.#menuContainer, this.#siteMenuView, RenderPosition.BEFORREEND);
  }

  #renderTripFilterView = () => {
    render(this.#tripFilterContainer, this.#tripFilterView, RenderPosition.BEFORREEND);
  }

  #renderTripInfoView = () => {
    render(this.#tripMain, this.#tripInfoView, RenderPosition.AFTERBEGIN);
  }

  #renderTripSortingView = () => {
    render(this.#tripEvents, this.#tripSortingView, RenderPosition.BEFORREEND);
  }

  #renderNoEventView = () => {
    render(this.#tripEvents, this.#noEventView, RenderPosition.BEFORREEND);
  }

  #renderEvents = () => {
    for(const event of this.#events) {
      const eventPresenter = new EventPresenter(this.#tripEventsList);
      eventPresenter.init(event);
    }
  }

  #renderPageContent = () => {
    this.#renderSiteMenuView();
    this.#renderTripFilterView();
    this.#renderTripInfoView();
    this.#renderTripSortingView();
    
    if(!this.#events.length) {
      this.#renderNoEventView();
    } 
    
    this.#renderEvents();
  }
}