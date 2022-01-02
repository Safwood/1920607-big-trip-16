import { eventTypes, countDurationInMinutes } from 'utils'

export const countEventTypes = (events) => {
  const allTypes = [];

  eventTypes.forEach(eventType => allTypes.push({[eventType]: events.filter(event => event.type === eventType).length}))

  return allTypes.sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
}

export const countTypesCost = (events) => {
  const allTypes = [];

  eventTypes.forEach(eventType => {
    allTypes.push({[eventType]: events.filter(event => event.type === eventType).reduce((acc, event) => {
      return acc += event.price
    }, 0)});
  })

  return allTypes.sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
}

export const countTypesTotalTime = (events) => {
  const allTypes = [];

  eventTypes.forEach(eventType => {
    allTypes.push({[eventType]: events.filter(event => event.type === eventType).reduce((acc, event) => {
      return acc += countDurationInMinutes(event.finishDate, event.startDate)
    }, 0)});
  })

  return allTypes.sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
}