import {  generateEvent, render, RenderPosition, MenuItems, remove } from 'utils';
import TripPresenter from 'presenter/trip-presenter';
import FilterPresenter from 'presenter/filter-presenter';
import SortingPresenter from 'presenter/sorting-presenter';
import PointsModel from 'model/points-model';
import FilterModel from 'model/filter-model';
import SortingModel from 'model/sorting-model';
import ChartView from 'view/chart-view';
import SiteMenuView from 'view/site-menu-view';

const EVENT_COUNT = 2;

const events = Array.from({length: EVENT_COUNT}, generateEvent);

const menuContainer = document.querySelector('.trip-controls__navigation');
const pageContainer = document.querySelector('.page-body__page-main').firstElementChild;
const tripFilterContainer = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
pointsModel.events = events;

const filterModel = new FilterModel();
const sortingModel = new SortingModel();

const filterPresenter = new FilterPresenter(tripFilterContainer, filterModel, pointsModel);
const sortingPresenter = new SortingPresenter(tripEvents, sortingModel, pointsModel);
const tripPresenter = new TripPresenter(pointsModel, tripMain, tripEvents, filterModel, sortingModel);

let chartView;
const siteMenuView = new SiteMenuView();

render(menuContainer, siteMenuView, RenderPosition.AFTERBEGIN);

tripPresenter.init(pointsModel.events);
filterPresenter.init();
sortingPresenter.init();

const handleNewEventFormClose = () => {
  siteMenuView.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.remove('trip-tabs__btn--disabled');
  siteMenuView.element.querySelector(`[id=${MenuItems.STATS}]`).classList.remove('trip-tabs__btn--disabled');
  siteMenuView.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.add('trip-tabs__btn--active');
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItems.NEW_EVENT:
      siteMenuView.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.add('trip-tabs__btn--disabled');
      siteMenuView.element.querySelector(`[id=${MenuItems.STATS}]`).classList.add('trip-tabs__btn--disabled');
      siteMenuView.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.remove('trip-tabs__btn--active');
      siteMenuView.element.querySelector(`[id=${MenuItems.STATS}]`).classList.remove('trip-tabs__btn--active');
      tripPresenter.openAddEventForm(handleNewEventFormClose);
      remove(chartView);
      tripPresenter.clearEventList();
      tripPresenter.renderEvents();
      filterPresenter.init();
      sortingPresenter.init();
      break;
    case MenuItems.TABLE:
      siteMenuView.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.add('trip-tabs__btn--active');
      siteMenuView.element.querySelector(`[id=${MenuItems.STATS}]`).classList.remove('trip-tabs__btn--active');
      remove(chartView);
      tripPresenter.renderEvents();
      filterPresenter.init();
      sortingPresenter.init();
      break;
    case MenuItems.STATS:
      siteMenuView.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.remove('trip-tabs__btn--active');
      siteMenuView.element.querySelector(`[id=${MenuItems.STATS}]`).classList.add('trip-tabs__btn--active');
      chartView = new ChartView(pointsModel.events);
      render(pageContainer, chartView, RenderPosition.BEFORREEND);
      chartView.init();
      filterPresenter.destroy();
      sortingPresenter.destroy();
      tripPresenter.clearEventList();
      break;
  }
};

siteMenuView.setMenuClickHandler(handleSiteMenuClick);
