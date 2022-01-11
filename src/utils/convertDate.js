import dayjs from 'dayjs';

export const convertDateWithYear = (date) => dayjs(date).format('YYYY/MM/DD');
export const convertDateWithTime = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
export const convertDateWithMonth = (date) => dayjs(date).format('MMM DD');
export const getTime = (date) => dayjs(date).format('HH/mm');
