# Проект «Большое путешествие»

Данное приложение помогает удобно строить маршрут своего путешествия и подсчитывать бюджет. 

Для создания маршрута: 
* нажмите на кнопку "new event"
* выбирете тип поездки, пункт назначения, заполните дату, стоимость и дополнительные опции
* нажмите "save", добавьте другие точки маршрута

После сохранения точки маршрута будет атоматически подсчитываться общая стоимость в верхнем правом углу экрана.
А также напротив каждой точки маршрута будет отображаться общее время проведенное на этой точке.
Точки маршрута можно сортировать и фильтровать по дате, цене или в алфавитном порядке.

В пункте меню "Stats" можно посмотреть статистику путешествия.


### Разработка

В проекте использовались:
* JS, ООП, классы, MVP
* chart.js
* dayjs 
* flatpickr
* все точки маршрутов скачиваются с помощью HTTP запроса на сервер

---
English version

# Project «Big trip»

This application helps easily to build a route of your trip and count the budget. 

To build a route: 
* click "new event" button
* choose the type of the travel, destination, dates, price and additional options
* click "save", add other trip points

After saving trip points, the application will count total cost of the trip and display it in the right top side of the page.
Next to the destination you will also see total time spent in the particalar point.
Points of the route can be sorted or filtered by dates, price, or alphabat.

You can also see the statistics of the trip clicking "Stats" in menu.

### Developing

In this project I used:
* JS, OOP, classes, MVP
* chart.js
* dayjs 
* flatpickr
* route destications are downloaded from server