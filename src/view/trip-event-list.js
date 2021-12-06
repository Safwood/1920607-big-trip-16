import AbstractView from './abstract-view';

export const creactEventListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class EventListView extends AbstractView {
  get template() {
    return creactEventListTemplate();
  }

}
