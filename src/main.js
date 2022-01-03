import {  generateEvent, render, RenderPosition, MenuItems } from 'utils';
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

const chartView = new ChartView(events);
const siteMenuView = new SiteMenuView();

const handleNewEventFormClose = () => {
  siteMenuView.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.remove('trip-tabs__btn--disabled');
  siteMenuView.element.querySelector(`[id=${MenuItems.STATS}]`).classList.remove('trip-tabs__btn--disabled');
  siteMenuView.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.add('trip-tabs__btn--active');
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItems.NEW_EVENT:
      tripPresenter.openAddEventForm(handleNewEventFormClose);
      siteMenuView.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.add('trip-tabs__btn--disabled');
      siteMenuView.element.querySelector(`[id=${MenuItems.STATS}]`).classList.add('trip-tabs__btn--disabled');
      siteMenuView.element.querySelector(`[id=${MenuItems.TABLE}]`).classList.remove('trip-tabs__btn--active');
      siteMenuView.element.querySelector(`[id=${MenuItems.STATS}]`).classList.remove('trip-tabs__btn--active');
      break;
    case MenuItems.TABLE:
      console.log(menuItem)
      break;
    case MenuItems.STATS:
      console.log(menuItem)
      break;
  }
};

siteMenuView.setMenuClickHandler(handleSiteMenuClick);

render(menuContainer, siteMenuView, RenderPosition.AFTERBEGIN);
render(pageContainer, chartView, RenderPosition.BEFORREEND);

tripPresenter.init(events);
filterPresenter.init();
sortingPresenter.init();
chartView.init()
