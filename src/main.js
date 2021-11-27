import { createSiteMenuTemplate } from './view/site-menu-view';
import { createTriptFilterTemplate } from './view/trip-filter-view';
import { createTripInfoTemplate } from './view/trip-info-view';
import { createTripSortingTemplate } from './view/trip-sorting-view';
import { creactEventListTemplate } from './view/trip-event-list';
import { createEventItemTemplate } from './view/trip-event-item';
import { createTripNewEventTemplate } from './view/trip-new-point-without-destination';
import {  generateEvent, countTotalSum } from './utils';


const EVENT_COUNT = 25;

export const renderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFORREEND: 'beforeend',
  AFTEREND: 'afterend'
};

const events = Array.from({length: EVENT_COUNT}, generateEvent);

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const menuContainer = document.querySelector('.trip-controls__navigation');
const tripFilterContainer = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const totalPrice = countTotalSum(events);

renderTemplate(menuContainer, createSiteMenuTemplate(), renderPosition.BEFORREEND);
renderTemplate(tripFilterContainer, createTriptFilterTemplate(), renderPosition.BEFORREEND);
renderTemplate(tripMain, createTripInfoTemplate(totalPrice), renderPosition.AFTERBEGIN);
renderTemplate(tripEvents, createTripSortingTemplate(), renderPosition.BEFORREEND);
renderTemplate(tripEvents, creactEventListTemplate(), renderPosition.BEFORREEND);

const tripEventsList = document.querySelector('.trip-events__list');

renderTemplate(tripEventsList, createTripNewEventTemplate(events[0]), renderPosition.AFTERBEGIN);

for(const event of events) {
  renderTemplate(tripEventsList, createEventItemTemplate(event), renderPosition.BEFORREEND);
}
