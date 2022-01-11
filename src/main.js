import { render, RenderPosition, MenuItems, remove } from 'utils';
import TripPresenter from 'presenter/trip-presenter';
import FilterPresenter from 'presenter/filter-presenter';
import SortingPresenter from 'presenter/sorting-presenter';
import PointsModel from 'model/points-model';
import FilterModel from 'model/filter-model';
import SortingModel from 'model/sorting-model';
import ChartView from 'view/chart-view';
import SiteMenuView from 'view/site-menu-view';
import ApiService from 'apis/api-service.js';

const AUTHORIZATION = 'Basic k651vb51gf54fon';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const menuContainer = document.querySelector('.trip-controls__navigation');
const pageContainer = document.querySelector('.page-body__page-main').firstElementChild;
const tripFilterContainer = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const sortingModel = new SortingModel();
const siteMenuView = new SiteMenuView();

const filterPresenter = new FilterPresenter(tripFilterContainer, filterModel, pointsModel);
const sortingPresenter = new SortingPresenter(tripEvents, sortingModel, pointsModel);
const tripPresenter = new TripPresenter(pointsModel, tripMain, tripEvents, filterModel, sortingModel);

const handleNewEventFormClose = () => {
  siteMenuView.resetButtons();
  tripPresenter.unblockEvents();
};

let chartView;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItems.NEW_EVENT:
      siteMenuView.blockMenuButtons();
      tripPresenter.openAddEventForm();
      remove(chartView);
      tripPresenter.clearEventList();
      tripPresenter.renderEvents();
      filterPresenter.init();
      sortingPresenter.init();
      break;
    case MenuItems.TABLE:
      siteMenuView.setTableButtonActive();
      remove(chartView);
      tripPresenter.renderEvents();
      filterPresenter.init();
      sortingPresenter.init();
      break;
    case MenuItems.STATS:
      siteMenuView.setStatButtonActive();
      chartView = new ChartView(pointsModel.events);
      render(pageContainer, chartView, RenderPosition.BEFORREEND);
      chartView.init();
      filterPresenter.destroy();
      sortingPresenter.destroy();
      tripPresenter.clearEventList();
      break;
  }
};

tripPresenter.init(handleNewEventFormClose);
pointsModel.init().finally(() => {
  filterPresenter.init();
  sortingPresenter.init();
  render(menuContainer, siteMenuView, RenderPosition.AFTERBEGIN);
  siteMenuView.setMenuClickHandler(handleSiteMenuClick);
});
