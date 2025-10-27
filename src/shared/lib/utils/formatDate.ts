import moment from 'moment';

export const formatDate = (dateString: string): string => {
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  const m = isDateOnly ? moment(dateString, 'YYYY-MM-DD') : moment(dateString);
  const pattern = 'dddd, MMM D, YYYY';
  return m.format(pattern);
};
