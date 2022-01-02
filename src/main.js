import {  generateEvent } from 'utils';
import TripPresenter from 'presenter/trip-presenter';
import FilterPresenter from 'presenter/filter-presenter';
import SortingPresenter from 'presenter/sorting-presenter';
import PointsModel from 'model/points-model';
import FilterModel from 'model/filter-model';
import SortingModel from 'model/sorting-model';

const EVENT_COUNT = 2;

const events = Array.from({length: EVENT_COUNT}, generateEvent);

const menuContainer = document.querySelector('.trip-controls__navigation');
const tripFilterContainer = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
pointsModel.events = events;

const filterModel = new FilterModel();
const sortingModel = new SortingModel();

const tripPresenter = new TripPresenter(pointsModel, menuContainer, tripMain, tripEvents, filterModel, sortingModel);
const filterPresenter = new FilterPresenter(tripFilterContainer, filterModel, pointsModel);
const sortingPresenter = new SortingPresenter(tripEvents, sortingModel, pointsModel);

tripPresenter.init();
filterPresenter.init();
sortingPresenter.init();
