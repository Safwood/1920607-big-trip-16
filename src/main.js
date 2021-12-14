import {  generateEvent } from 'utils';
import TripPresenter from 'presenter/trip-presenter';

const EVENT_COUNT = 2;

const events = Array.from({length: EVENT_COUNT}, generateEvent);

const menuContainer = document.querySelector('.trip-controls__navigation');
const tripFilterContainer = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(menuContainer, tripFilterContainer, tripMain, tripEvents);
tripPresenter.init(events);
