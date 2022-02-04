/******/ (() => { // webpackBootstrap
/******/ 	const __webpack_modules__ = ({

    /***/ './src/mock/events.js':
    /*!****************************!*\
  !*** ./src/mock/events.js ***!
  \****************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */   'possibleDurationTimeMinutes': () => (/* binding */ possibleDurationTimeMinutes),
        /* harmony export */   'possibleEventPrice': () => (/* binding */ possibleEventPrice),
        /* harmony export */   'descriptionText': () => (/* binding */ descriptionText),
        /* harmony export */   'event': () => (/* binding */ event),
        /* harmony export */   'offersTypes': () => (/* binding */ offersTypes)
        /* harmony export */ });
      const possibleDurationTimeMinutes = {
        'Taxi': 120,
        'Bus': 180,
        'Train': 180,
        'Ship': 2880,
        'Drive': 2880,
        'Flight': 2880,
        'Check-in': 60,
        'Sightseeing': 300,
        'Restaurant': 120
      };
      const possibleEventPrice = {
        'Taxi': {
          min: 50,
          max: 100
        },
        'Bus': {
          min: 20,
          max: 50
        },
        'Train': {
          min: 100,
          max: 200
        },
        'Ship': {
          min: 300,
          max: 500
        },
        'Drive': {
          min: 500,
          max: 600
        },
        'Flight': {
          min: 600,
          max: 1000
        },
        'Check-in': {
          min: 0,
          max: 0
        },
        'Sightseeing': {
          min: 50,
          max: 250
        },
        'Restaurant': {
          min: 50,
          max: 150
        }
      };
      const descriptionText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'; //TODO от 0 до 5 случайный предожение

      const event = {
        destination: '',
        type: '',
        startDate: 0,
        finishDate: 0,
        startTime: 0,
        finishTime: 0,
        price: 0,
        offers: [],
        isFavorite: false,
        photos: [],
        description: ''
      };
      const offersTypes = [{
        'type': 'Taxi',
        'offers': [{
          'id': 1,
          'title': 'Upgrade to a business class',
          'price': 120
        }, {
          'id': 2,
          'title': 'Choose the radio station',
          'price': 60
        }, {
          'id': 3,
          'title': 'Order Uber',
          'price': 20
        }]
      }, {
        'type': 'Bus',
        'offers': [{
          'id': 1,
          'title': 'Upgrade to a business class',
          'price': 120
        }, {
          'id': 2,
          'title': 'Rent mini-bus',
          'price': 500
        }]
      }, {
        'type': 'Train',
        'offers': [{
          'id': 1,
          'title': 'Upgrade to a business class',
          'price': 120
        }, {
          'id': 2,
          'title': 'Order breakfast',
          'price': 60
        }]
      }, {
        'type': 'Ship',
        'offers': [{
          'id': 1,
          'title': 'Upgrade to a business class',
          'price': 120
        }, {
          'id': 2,
          'title': 'Order breakfast',
          'price': 60
        }]
      }, {
        'type': 'Drive',
        'offers': [{
          'id': 1,
          'title': 'Rent a car',
          'price': 200
        }, {
          'id': 2,
          'title': 'Rent a car with a driver',
          'price': 500
        }]
      }, {
        'type': 'Flight',
        'offers': [{
          'id': 1,
          'title': 'Add luggage',
          'price': 50
        }, {
          'id': 2,
          'title': 'Switch to comfort',
          'price': 80
        }]
      }, {
        'type': 'Check-in',
        'offers': [{
          'id': 1,
          'title': 'Check-in online',
          'price': 20
        }, {
          'id': 2,
          'title': 'Add breakfast',
          'price': 50
        }]
      }, {
        'type': 'Sightseeing',
        'offers': [{
          'id': 1,
          'title': 'Visit museum',
          'price': 50
        }, {
          'id': 2,
          'title': 'Order tour guide',
          'price': 200
        }]
      }, {
        'type': 'Restaurant',
        'offers': [{
          'id': 1,
          'title': 'Book a table',
          'price': 5
        }, {
          'id': 2,
          'title': 'Order romantic dinner',
          'price': 500
        }]
      }];

      /***/ }),

    /***/ './src/utils.js':
    /*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */   'getRandomIntenger': () => (/* binding */ getRandomIntenger),
        /* harmony export */   'generateRandomDate': () => (/* binding */ generateRandomDate),
        /* harmony export */   'generateEventCity': () => (/* binding */ generateEventCity),
        /* harmony export */   'generateEventType': () => (/* binding */ generateEventType),
        /* harmony export */   'generateRandomPrice': () => (/* binding */ generateRandomPrice),
        /* harmony export */   'generateDescription': () => (/* binding */ generateDescription),
        /* harmony export */   'getRandomPhotos': () => (/* binding */ getRandomPhotos),
        /* harmony export */   'getIsFavourite': () => (/* binding */ getIsFavourite),
        /* harmony export */   'countDuration': () => (/* binding */ countDuration),
        /* harmony export */   'generateEvent': () => (/* binding */ generateEvent)
        /* harmony export */ });
      /* harmony import */ const dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ './node_modules/dayjs/dayjs.min.js');
      /* harmony import */ const dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */ const dayjs_plugin_duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs/plugin/duration */ './node_modules/dayjs/plugin/duration.js');
      /* harmony import */ const dayjs_plugin_duration__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_duration__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */ const _mock_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mock/events */ './src/mock/events.js');


      dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_duration__WEBPACK_IMPORTED_MODULE_1___default()));
      const getRandomIntenger = (a = 0, b = 1) => {
        const lower = Math.ceil(Math.min(a, b));
        const upper = Math.floor(Math.max(a, b));
        return Math.floor(lower + Math.random() * (upper - lower + 1));
      };
      const generateRandomDate = (eventType) => {
        //использую минуты чтобы легче было установить рандомное время
        const randomMinutesIntervalFromToday = getRandomIntenger(15, 43200);
        const randomDurationTime = getRandomIntenger(15, _mock_events__WEBPACK_IMPORTED_MODULE_2__.possibleDurationTimeMinutes[eventType]);
        return {
          eventDateFrom: dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(randomMinutesIntervalFromToday, 'minute').toDate(),
          eventDateTo: dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(randomMinutesIntervalFromToday + randomDurationTime, 'minute').toDate()
        };
      };
      const generateEventCity = () => {
        const places = ['Amsterdam', 'Chamonix', 'Paris'];
        const randomIndex = getRandomIntenger(0, places.length - 1);
        return places[randomIndex];
      };
      const generateEventType = () => {
        const eventTypes = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
        const randomIndex = getRandomIntenger(0, eventTypes.length - 1);
        return eventTypes[randomIndex];
      };
      const generateRandomPrice = (eventType) => getRandomIntenger(_mock_events__WEBPACK_IMPORTED_MODULE_2__.possibleEventPrice[eventType].min, _mock_events__WEBPACK_IMPORTED_MODULE_2__.possibleEventPrice[eventType].max);
      const generateDescription = () => {
        const sentencesCount = getRandomIntenger(1, 10);
        const sentencesStartingIndex = getRandomIntenger(0, 10 - sentencesCount);
        return _mock_events__WEBPACK_IMPORTED_MODULE_2__.descriptionText.split('.').splice(sentencesStartingIndex, sentencesCount).join('.');
      };
      const getRandomPhotos = () => {
        const photos = [];
        const randomCount = getRandomIntenger(0, 5);

        for (let i = 0; i < randomCount; i++) {
          photos.push(`http://picsum.photos/248/152?r=${getRandomIntenger(0, 1000)}`);
        }

        return photos;
      };
      const getIsFavourite = () => {
        const randomCount = getRandomIntenger(0, 1);

        if (randomCount) {
          return true;
        } else {
          return false;
        }
      };
      const countDuration = (to, from) => {
        const durationInMinutes = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(to).diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(from), 'minute');
        if (durationInMinutes < 60) {return `${dayjs__WEBPACK_IMPORTED_MODULE_0___default().duration(durationInMinutes, 'minute').format('MM')}M`;}
        if (durationInMinutes < 24 * 60) {return `${dayjs__WEBPACK_IMPORTED_MODULE_0___default().duration(durationInMinutes, 'minute').format('HH')}H ${dayjs__WEBPACK_IMPORTED_MODULE_0___default().duration(durationInMinutes, 'minute').format('MM')}M`;}
        return `${dayjs__WEBPACK_IMPORTED_MODULE_0___default().duration(durationInMinutes, 'minute').format('DD')}D ${dayjs__WEBPACK_IMPORTED_MODULE_0___default().duration(durationInMinutes, 'minute').format('HH')}H ${dayjs__WEBPACK_IMPORTED_MODULE_0___default().duration(durationInMinutes, 'minute').format('MM')}M`;
      };
      const generateEvent = () => {
        const eventType = generateEventType();
        const dates = generateRandomDate(eventType);
        countDuration(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dates.eventDateTo).format('HH:MM'), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dates.eventDateFrom).format('HH:MM'));
        return {
          destination: generateEventCity(),
          type: eventType,
          dateFrom: dates.eventDateFrom,
          dateTo: dates.eventDateTo,
          price: generateRandomPrice(eventType),
          offers: _mock_events__WEBPACK_IMPORTED_MODULE_2__.offersTypes.find((el) => el.type === eventType).offers,
          isFavorite: getIsFavourite(),
          photos: getRandomPhotos(),
          description: generateDescription()
        };
      };

      /***/ }),

    /***/ './src/view/site-menu-view.js':
    /*!************************************!*\
  !*** ./src/view/site-menu-view.js ***!
  \************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */   'createSiteMenuTemplate': () => (/* binding */ createSiteMenuTemplate)
        /* harmony export */ });
      const createSiteMenuTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
       <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
       <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;

      /***/ }),

    /***/ './src/view/trip-event-item.js':
    /*!*************************************!*\
  !*** ./src/view/trip-event-item.js ***!
  \*************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */   'createEventItemTemplate': () => (/* binding */ createEventItemTemplate)
        /* harmony export */ });
      /* harmony import */ const _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ './src/utils.js');
      /* harmony import */ const dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ './node_modules/dayjs/dayjs.min.js');
      /* harmony import */ const dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);


      const createEventItemTemplate = (event) => {
        const dayTo = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(event.dateTo).format('MMM DD');
        const timeTo = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(event.dateTo).format('HH:MM');
        const timeFrom = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(event.dateFrom).format('HH:MM');
        const duration = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.countDuration)(event.dateTo, event.dateFrom);
        console.log(event.isFavorite);
        const isFavouriteClassName = `event__favorite-btn${event.isFavorite ? ' event__favorite-btn--active' : ''}`;
        console.log(isFavouriteClassName);
        return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime=${'2019-03-18'}>${dayTo}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${event.type} ${event.destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${'2019-03-18T10:30'}>${timeTo}</time>
          &mdash;
          <time class="event__end-time" datetime=${'2019-03-18T11:00'}>${timeFrom}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${event.price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">${'Order Uber'}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${'20'}</span>
        </li>
      </ul>
      <button class=${isFavouriteClassName} type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
      };

      /***/ }),

    /***/ './src/view/trip-event-list.js':
    /*!*************************************!*\
  !*** ./src/view/trip-event-list.js ***!
  \*************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */   'creactEventListTemplate': () => (/* binding */ creactEventListTemplate)
        /* harmony export */ });
      const creactEventListTemplate = () => `<ul class="trip-events__list">
  </ul>`;

      /***/ }),

    /***/ './src/view/trip-filter-view.js':
    /*!**************************************!*\
  !*** ./src/view/trip-filter-view.js ***!
  \**************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */   'createTriptFilterTemplate': () => (/* binding */ createTriptFilterTemplate)
        /* harmony export */ });
      const createTriptFilterTemplate = () => `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

      /***/ }),

    /***/ './src/view/trip-info-view.js':
    /*!************************************!*\
  !*** ./src/view/trip-info-view.js ***!
  \************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */   'createTripInfoTemplate': () => (/* binding */ createTripInfoTemplate)
        /* harmony export */ });
      const createTripInfoTemplate = () => `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>`;

      /***/ }),

    /***/ './src/view/trip-new-point-without-destination.js':
    /*!********************************************************!*\
  !*** ./src/view/trip-new-point-without-destination.js ***!
  \********************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */   'createTripNewEventTemplate': () => (/* binding */ createTripNewEventTemplate)
        /* harmony export */ });
      const createTripNewEventTemplate = () => `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      Flight
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                        <label class="event__offer-label" for="event-offer-luggage-1">
                          <span class="event__offer-title">Add luggage</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">30</span>
                        </label>
                      </div>

                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
                        <label class="event__offer-label" for="event-offer-comfort-1">
                          <span class="event__offer-title">Switch to comfort class</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">100</span>
                        </label>
                      </div>

                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                        <label class="event__offer-label" for="event-offer-meal-1">
                          <span class="event__offer-title">Add meal</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">15</span>
                        </label>
                      </div>

                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                        <label class="event__offer-label" for="event-offer-seats-1">
                          <span class="event__offer-title">Choose seats</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">5</span>
                        </label>
                      </div>

                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                        <label class="event__offer-label" for="event-offer-train-1">
                          <span class="event__offer-title">Travel by train</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">40</span>
                        </label>
                      </div>
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
                        <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
                        <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
                        <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
                        <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;

      /***/ }),

    /***/ './src/view/trip-sorting-view.js':
    /*!***************************************!*\
  !*** ./src/view/trip-sorting-view.js ***!
  \***************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */   'createTripSortingTemplate': () => (/* binding */ createTripSortingTemplate)
        /* harmony export */ });
      const createTripSortingTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`;

      /***/ }),

    /***/ './node_modules/dayjs/dayjs.min.js':
    /*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
    /***/ (function(module) {

      !function(t,e){ true?module.exports=e():0;}(this,(()=> {let t=1e3,e=6e4,n=36e5,r='millisecond',i='second',s='minute',u='hour',a='day',o='week',f='month',h='quarter',c='year',d='date',$='Invalid Date',l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:'en',weekdays:'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),months:'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')},m=function(t,e,n){const r=String(t);return!r||r.length>=e?t:`${Array(e+1-r.length).join(n)}${t}`;},g={s:m,z:function(t){const e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return`${(e<=0?'+':'-')+m(r,2,'0')}:${m(i,2,'0')}`;},m:function t(e,n){if(e.date()<n.date()){return-t(n,e);}const r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0);},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t);},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||'').toLowerCase().replace(/s$/,'');},u:function(t){return void 0===t;}},D='en',v={};v[D]=M;const p=function(t){return t instanceof _;},S=function(t,e,n){let r;if(!t){return D;}if('string'===typeof t){v[t]&&(r=t),e&&(v[t]=e,r=t);}else{const i=t.name;v[i]=t,r=i;}return!n&&r&&(D=r),r||!n&&D;},w=function(t,e){if(p(t)){return t.clone();}const n='object'===typeof e?e:{};return n.date=t,n.args=arguments,new _(n);},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset});};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}const m=M.prototype;return m.parse=function(t){this.$d=function(t){const e=t.date,n=t.utc;if(null===e){return new Date(NaN);}if(O.u(e)){return new Date;}if(e instanceof Date){return new Date(e);}if('string'===typeof e&&!/Z$/i.test(e)){const r=e.match(l);if(r){const i=r[2]-1||0,s=(r[7]||'0').substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s);}}return new Date(e);}(t),this.$x=t.x||{},this.init();},m.init=function(){const t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O;},m.isValid=function(){return!(this.$d.toString()===$);},m.isSame=function(t,e){const n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e);},m.isAfter=function(t,e){return w(t)<this.startOf(e);},m.isBefore=function(t,e){return this.endOf(e)<w(t);},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t);},m.unix=function(){return Math.floor(this.valueOf()/1e3);},m.valueOf=function(){return this.$d.getTime();},m.startOf=function(t,e){const n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){const i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a);},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate('s'),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n);},y=this.$W,M=this.$M,m=this.$D,g=`set${this.$u?'UTC':''}`;switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(`${g}Hours`,0);case u:return l(`${g}Minutes`,1);case s:return l(`${g}Seconds`,2);case i:return l(`${g}Milliseconds`,3);default:return this.clone();}},m.endOf=function(t){return this.startOf(t,!1);},m.$set=function(t,e){let n,o=O.p(t),h=`set${this.$u?'UTC':''}`,$=(n={},n[a]=`${h}Date`,n[d]=`${h}Date`,n[f]=`${h}Month`,n[c]=`${h}FullYear`,n[u]=`${h}Hours`,n[s]=`${h}Minutes`,n[i]=`${h}Seconds`,n[r]=`${h}Milliseconds`,n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){const y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else {$&&this.$d[$](l);}return this.init(),this;},m.set=function(t,e){return this.clone().$set(t,e);},m.get=function(t){return this[O.p(t)]();},m.add=function(r,h){let d,$=this;r=Number(r);const l=O.p(h),y=function(t){const e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$);};if(l===f){return this.set(f,this.$M+r);}if(l===c){return this.set(c,this.$y+r);}if(l===a){return y(1);}if(l===o){return y(7);}const M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this);},m.subtract=function(t,e){return this.add(-1*t,e);},m.format=function(t){const e=this,n=this.$locale();if(!this.isValid()){return n.invalidDate||$;}const r=t||'YYYY-MM-DDTHH:mm:ssZ',i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s);},c=function(t){return O.s(s%12||12,t,'0');},d=n.meridiem||function(t,e,n){const r=t<12?'AM':'PM';return n?r.toLowerCase():r;},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,'0'),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,'0'),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,'0'),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,'0'),s:String(this.$s),ss:O.s(this.$s,2,'0'),SSS:O.s(this.$ms,3,'0'),Z:i};return r.replace(y,((t,e)=> e||l[t]||i.replace(':','')));},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15);},m.diff=function(r,d,$){let l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D);},m.daysInMonth=function(){return this.endOf(f).$D;},m.$locale=function(){return v[this.$L];},m.locale=function(t,e){if(!t){return this.$L;}const n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n;},m.clone=function(){return O.w(this.$d,this);},m.toDate=function(){return new Date(this.valueOf());},m.toJSON=function(){return this.isValid()?this.toISOString():null;},m.toISOString=function(){return this.$d.toISOString();},m.toString=function(){return this.$d.toUTCString();},M;}(),b=_.prototype;return w.prototype=b,[['$ms',r],['$s',i],['$m',s],['$H',u],['$W',a],['$M',f],['$y',c],['$D',d]].forEach(((t)=> {b[t[1]]=function(e){return this.$g(e,t[0],t[1]);};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w;},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t);},w.en=v[D],w.Ls=v,w.p={},w;}));

      /***/ }),

    /***/ './node_modules/dayjs/plugin/duration.js':
    /*!***********************************************!*\
  !*** ./node_modules/dayjs/plugin/duration.js ***!
  \***********************************************/
    /***/ (function(module) {

      !function(t,s){ true?module.exports=s():0;}(this,(()=> {var t,s,n=1e3,i=6e4,e=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,u=31536e6,h=2592e6,a=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:u,months:h,days:r,hours:e,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},c=function(t){return t instanceof p;},f=function(t,s,n){return new p(t,n,s.$l);},m=function(t){return `${s.p(t)}s`;},l=function(t){return t<0;},$=function(t){return l(t)?Math.ceil(t):Math.floor(t);},y=function(t){return Math.abs(t);},g=function(t,s){return t?l(t)?{negative:!0,format:`${y(t)}${s}`}:{negative:!1,format:`${t}${s}`}:{negative:!1,format:''};},p=function(){function l(t,s,n){const i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),s){return f(t*d[m(s)],this);}if('number'===typeof t){return this.$ms=t,this.parseFromMilliseconds(),this;}if('object'===typeof t){return Object.keys(t).forEach(((s)=> {i.$d[m(s)]=t[s];})),this.calMilliseconds(),this;}if('string'===typeof t){const e=t.match(a);if(e){const r=e.slice(2).map(((t)=> null!=t?Number(t):0));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this;}}return this;}const y=l.prototype;return y.calMilliseconds=function(){const t=this;this.$ms=Object.keys(this.$d).reduce(((s,n)=> s+(t.$d[n]||0)*d[n]),0);},y.parseFromMilliseconds=function(){let t=this.$ms;this.$d.years=$(t/u),t%=u,this.$d.months=$(t/h),t%=h,this.$d.days=$(t/r),t%=r,this.$d.hours=$(t/e),t%=e,this.$d.minutes=$(t/i),t%=i,this.$d.seconds=$(t/n),t%=n,this.$d.milliseconds=t;},y.toISOString=function(){let t=g(this.$d.years,'Y'),s=g(this.$d.months,'M'),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);let i=g(n,'D'),e=g(this.$d.hours,'H'),r=g(this.$d.minutes,'M'),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);const u=g(o,'S'),h=t.negative||s.negative||i.negative||e.negative||r.negative||u.negative,a=e.format||r.format||u.format?'T':'',d=`${h?'-':''}P${t.format}${s.format}${i.format}${a}${e.format}${r.format}${u.format}`;return'P'===d||'-P'===d?'P0D':d;},y.toJSON=function(){return this.toISOString();},y.format=function(t){const n=t||'YYYY-MM-DDTHH:mm:ss',i={Y:this.$d.years,YY:s.s(this.$d.years,2,'0'),YYYY:s.s(this.$d.years,4,'0'),M:this.$d.months,MM:s.s(this.$d.months,2,'0'),D:this.$d.days,DD:s.s(this.$d.days,2,'0'),H:this.$d.hours,HH:s.s(this.$d.hours,2,'0'),m:this.$d.minutes,mm:s.s(this.$d.minutes,2,'0'),s:this.$d.seconds,ss:s.s(this.$d.seconds,2,'0'),SSS:s.s(this.$d.milliseconds,3,'0')};return n.replace(o,((t,s)=> s||String(i[t])));},y.as=function(t){return this.$ms/d[m(t)];},y.get=function(t){let s=this.$ms,n=m(t);return'milliseconds'===n?s%=1e3:s='weeks'===n?$(s/d[n]):this.$d[n],0===s?0:s;},y.add=function(t,s,n){let i;return i=s?t*d[m(s)]:c(t)?t.$ms:f(t,this).$ms,f(this.$ms+i*(n?-1:1),this);},y.subtract=function(t,s){return this.add(t,s,!0);},y.locale=function(t){const s=this.clone();return s.$l=t,s;},y.clone=function(){return f(this.$ms,this);},y.humanize=function(s){return t().add(this.$ms,'ms').locale(this.$l).fromNow(!s);},y.milliseconds=function(){return this.get('milliseconds');},y.asMilliseconds=function(){return this.as('milliseconds');},y.seconds=function(){return this.get('seconds');},y.asSeconds=function(){return this.as('seconds');},y.minutes=function(){return this.get('minutes');},y.asMinutes=function(){return this.as('minutes');},y.hours=function(){return this.get('hours');},y.asHours=function(){return this.as('hours');},y.days=function(){return this.get('days');},y.asDays=function(){return this.as('days');},y.weeks=function(){return this.get('weeks');},y.asWeeks=function(){return this.as('weeks');},y.months=function(){return this.get('months');},y.asMonths=function(){return this.as('months');},y.years=function(){return this.get('years');},y.asYears=function(){return this.as('years');},l;}();return function(n,i,e){t=e,s=e().$utils(),e.duration=function(t,s){const n=e.locale();return f(t,{$l:n},s);},e.isDuration=c;const r=i.prototype.add,o=i.prototype.subtract;i.prototype.add=function(t,s){return c(t)&&(t=t.asMilliseconds()),r.bind(this)(t,s);},i.prototype.subtract=function(t,s){return c(t)&&(t=t.asMilliseconds()),o.bind(this)(t,s);};};}));

      /***/ })

    /******/ 	});
  /************************************************************************/
  /******/ 	// The module cache
  /******/ 	const __webpack_module_cache__ = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		const cachedModule = __webpack_module_cache__[moduleId];
    /******/ 		if (cachedModule !== undefined) {
      /******/ 			return cachedModule.exports;
      /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		const module = __webpack_module_cache__[moduleId] = {
      /******/ 			// no module.id needed
      /******/ 			// no module.loaded needed
      /******/ 			exports: {}
      /******/ 		};
    /******/
    /******/ 		// Execute the module function
    /******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
  /******/
  /************************************************************************/
  /******/ 	/* webpack/runtime/compat get default export */
  /******/ 	(() => {
    /******/ 		// getDefaultExport function for compatibility with non-harmony modules
    /******/ 		__webpack_require__.n = (module) => {
      /******/ 			const getter = module && module.__esModule ?
      /******/ 				() => (module['default']) :
      /******/ 				() => (module);
      /******/ 			__webpack_require__.d(getter, { a: getter });
      /******/ 			return getter;
      /******/ 		};
    /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/define property getters */
  /******/ 	(() => {
    /******/ 		// define getter functions for harmony exports
    /******/ 		__webpack_require__.d = (exports, definition) => {
      /******/ 			for(const key in definition) {
        /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/ 				}
        /******/ 			}
      /******/ 		};
    /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
  /******/ 	(() => {
    /******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
    /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/make namespace object */
  /******/ 	(() => {
    /******/ 		// define __esModule on exports
    /******/ 		__webpack_require__.r = (exports) => {
      /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/ 			}
      /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
      /******/ 		};
    /******/ 	})();
  /******/
  /************************************************************************/
  const __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {

    /*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */   'renderPosition': () => (/* binding */ renderPosition),
      /* harmony export */   'renderTemplate': () => (/* binding */ renderTemplate)
      /* harmony export */ });
    /* harmony import */ const _view_site_menu_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/site-menu-view */ './src/view/site-menu-view.js');
    /* harmony import */ const _view_trip_filter_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/trip-filter-view */ './src/view/trip-filter-view.js');
    /* harmony import */ const _view_trip_info_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/trip-info-view */ './src/view/trip-info-view.js');
    /* harmony import */ const _view_trip_sorting_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/trip-sorting-view */ './src/view/trip-sorting-view.js');
    /* harmony import */ const _view_trip_event_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/trip-event-list */ './src/view/trip-event-list.js');
    /* harmony import */ const _view_trip_event_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/trip-event-item */ './src/view/trip-event-item.js');
    /* harmony import */ const _view_trip_new_point_without_destination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view/trip-new-point-without-destination */ './src/view/trip-new-point-without-destination.js');
    /* harmony import */ const _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ './src/utils.js');


    const EVENT_COUNT = 25;
    const renderPosition = {
      BEFOREBEGIN: 'beforebegin',
      AFTERBEGIN: 'afterbegin',
      BEFORREEND: 'beforeend',
      AFTEREND: 'afterend'
    };
    const events = Array.from({
      length: EVENT_COUNT
    }, _utils__WEBPACK_IMPORTED_MODULE_7__.generateEvent);
    const renderTemplate = (container, template, place) => {
      container.insertAdjacentHTML(place, template);
    };
    const menuContainer = document.querySelector('.trip-controls__navigation');
    const tripFilterContainer = document.querySelector('.trip-controls__filters');
    const tripMain = document.querySelector('.trip-main');
    const tripEvents = document.querySelector('.trip-events');
    renderTemplate(menuContainer, (0,_view_site_menu_view__WEBPACK_IMPORTED_MODULE_0__.createSiteMenuTemplate)(), renderPosition.BEFORREEND);
    renderTemplate(tripFilterContainer, (0,_view_trip_filter_view__WEBPACK_IMPORTED_MODULE_1__.createTriptFilterTemplate)(), renderPosition.BEFORREEND);
    renderTemplate(tripMain, (0,_view_trip_info_view__WEBPACK_IMPORTED_MODULE_2__.createTripInfoTemplate)(), renderPosition.AFTERBEGIN);
    renderTemplate(tripEvents, (0,_view_trip_sorting_view__WEBPACK_IMPORTED_MODULE_3__.createTripSortingTemplate)(), renderPosition.BEFORREEND);
    renderTemplate(tripEvents, (0,_view_trip_event_list__WEBPACK_IMPORTED_MODULE_4__.creactEventListTemplate)(), renderPosition.BEFORREEND);
    const tripEventsList = document.querySelector('.trip-events__list');
    renderTemplate(tripEventsList, (0,_view_trip_new_point_without_destination__WEBPACK_IMPORTED_MODULE_6__.createTripNewEventTemplate)(), renderPosition.AFTERBEGIN);

    for (const event of events) {
      renderTemplate(tripEventsList, (0,_view_trip_event_item__WEBPACK_IMPORTED_MODULE_5__.createEventItemTemplate)(event), renderPosition.BEFORREEND);
    }
  })();

/******/ })();

//# sourceMappingURL=bundle.js.map
