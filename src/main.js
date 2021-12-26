import {  generateEvent } from 'utils';
import TripPresenter from 'presenter/trip-presenter';
import PointsModel from 'model/points-model';

const EVENT_COUNT = 2;

const events = Array.from({length: EVENT_COUNT}, generateEvent);

const menuContainer = document.querySelector('.trip-controls__navigation');
const tripFilterContainer = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
pointsModel.eventPoints = events;

const tripPresenter = new TripPresenter(pointsModel, menuContainer, tripFilterContainer, tripMain, tripEvents);
tripPresenter.init(events);
