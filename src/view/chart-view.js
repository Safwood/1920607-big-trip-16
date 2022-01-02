import AbstractView from 'view/abstract-view'
import { getMoneyChat, typeChart, getTimeChat, countEventTypes, countTypesCost, countTypesTotalTime } from 'utils'

const createChartTemplate = () => {
  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time" width="900"></canvas>
    </div>
    </section>`
}

export default class ChartView extends AbstractView {
  #events = null;
  #eventCount = null;
  #eventsCost = null;
  #eventsTotalTime = null;

  constructor(events) {
    super();
    this.#events = events;
  }
  get template() {
    return createChartTemplate();
  }

  init = () => {
    this.#eventsCost = countTypesCost(this.#events);
    this.#eventCount = countEventTypes(this.#events)
    this.#eventsTotalTime = countTypesTotalTime(this.#events)
    this.#setChart()
  }

  #getMoneyChart = () => {
    const moneyCtx = this.element.querySelector('#money');
    getMoneyChat(moneyCtx, this.#eventsCost)
  }
  #getTypeChart = () => {
    const typeCtx = this.element.querySelector('#type');
    typeChart(typeCtx, this.#eventCount)
  }
  #getTimeChart = () => {
    const timeCtx = this.element.querySelector('#time');
    getTimeChat(timeCtx, this.#eventsTotalTime)
  }

  #setChart = () => {
    this.#getMoneyChart()
    this.#getTypeChart()
    this.#getTimeChart()
  }
}