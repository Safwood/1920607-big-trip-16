import SiteMenuView from './view/site-menu-view';
import TripFilterView from './view/trip-filter-view';
import TripInfoView from './view/trip-info-view';
import TripSortingView from './view/trip-sorting-view';
import EventListView from './view/trip-event-list';
import EventItemView from './view/trip-event-item';
import TripNewEventView from './view/trip-new-point-without-destination';
import NoEventView from './view/no-event-view';
import {  generateEvent, countTotalSum, render } from './utils';
import { RenderPosition } from './utils';

const EVENT_COUNT = 25;

const events = Array.from({length: EVENT_COUNT}, generateEvent);

const menuContainer = document.querySelector('.trip-controls__navigation');
const tripFilterContainer = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const totalPrice = countTotalSum(events);

render(menuContainer, new SiteMenuView().element, RenderPosition.BEFORREEND);
render(tripFilterContainer, new TripFilterView().element, RenderPosition.BEFORREEND);
render(tripMain, new TripInfoView(totalPrice).element, RenderPosition.AFTERBEGIN);
render(tripEvents, new TripSortingView().element, RenderPosition.BEFORREEND);
render(tripEvents, new EventListView().element, RenderPosition.BEFORREEND);

const renderEvent = (container, event) => {
  const eventElementView = new EventItemView(event);
  const newEventElementView = new TripNewEventView(event);

  const replaceCardToForm = () => {
    container.replaceChild(newEventElementView.element, eventElementView.element);
  };
  const replaceFormToCard = () => {
    container.replaceChild(eventElementView.element, newEventElementView.element);
  };

  const handleEscKeyDown = (e) => {
    if(e.key === 'Esc' || e.key === 'Escape') {
      e.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', handleEscKeyDown);
    }
  };

  eventElementView.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', handleEscKeyDown);
  })

  newEventElementView.setSaveButtonHandler(() => {
    replaceFormToCard();
  });

  newEventElementView.setCancelButtonHandler(replaceFormToCard);

  render(container, eventElementView.element, RenderPosition.BEFORREEND);
};

const tripEventsList = document.querySelector('.trip-events__list');

if(!events.length) {
  render(tripEvents, new NoEventView().element, RenderPosition.BEFORREEND);
} else {
  for(const event of events) {
    renderEvent(tripEventsList, event);
  }
}
