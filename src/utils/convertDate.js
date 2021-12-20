import dayjs from 'dayjs';

export const convertDateWithYear = (date) => dayjs(date).format('YYYY/MM/DD');
export const convertTimeForSorting = (date) => dayjs(date).format('HH/mm');
export const convertDateWithTime = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
export const convertDateWithMonth = (date) => dayjs(date).format('MMM DD');
export const convertDateWithDay = (date) => dayjs(date).format('DD/MM/YY');
export const getTime = (date) => dayjs(date).format('HH/mm');
