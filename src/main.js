import { createSiteMenuTemplate } from './view/site-menu-view';
import { createTriptFilterTemplate } from './view/trip-filter-view';
import { createTripInfoTemplate } from './view/trip-info-view';
import { createTripSortingTemplate } from './view/trip-sorting-view';
import { creactEventListTemplate } from './view/trip-event-list';
import { createEventItemTemplate } from './view/trip-event-item';
import { createTripNewEventTemplate } from './view/trip-new-point-without-destination';

const EVENT_COUNT = 3;

export const renderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFORREEND: 'beforeend',
  AFTEREND: 'afterend'
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const menuContainer = document.querySelector('.trip-controls__navigation');
const tripFilterContainer = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');

renderTemplate(menuContainer, createSiteMenuTemplate(), renderPosition.BEFORREEND);
renderTemplate(tripFilterContainer, createTriptFilterTemplate(), renderPosition.BEFORREEND);
renderTemplate(tripMain, createTripInfoTemplate(), renderPosition.AFTERBEGIN);
renderTemplate(tripEvents, createTripSortingTemplate(), renderPosition.BEFORREEND);
renderTemplate(tripEvents, creactEventListTemplate(), renderPosition.BEFORREEND);

const tripEventsList = document.querySelector('.trip-events__list');

renderTemplate(tripEventsList, createTripNewEventTemplate(), renderPosition.AFTERBEGIN);

for(let i = 0; i < EVENT_COUNT; i++) {
  renderTemplate(tripEventsList, createEventItemTemplate(), renderPosition.BEFORREEND);
}
