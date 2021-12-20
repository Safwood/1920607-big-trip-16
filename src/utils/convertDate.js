import dayjs from 'dayjs';

export const convertDateWithYear = (date) => {
  return dayjs(date).format('YYYY/MM/DD')
}
export const convertTimeForSorting = (date) => {
  return dayjs(date).format('HH/mm');
}
export const convertDateWithTime = (date) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
}
export const convertDateWithMonth = (date) => {
  return dayjs(date).format('MMM DD');
}
export const convertDateWithDay = (date) => {
  return dayjs(date).format('DD/MM/YY');
}
export const getTime = (date) => {
  return dayjs(date).format('HH/mm');
}
