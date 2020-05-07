import { monthsArray } from '../constants';

export const getIntlDateTimeString = dateObj => {
  const locale = 'en-US';
  const options = {
    day: 'numeric',
    month: 'long',
  };
  try {
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  } catch (error) {
    console.log(
      `The following error occurred while formatting a date object to string --> ${error}`,
    );
    return 'unknown';
  }
};

export const dateObjectFromTimeStamp = timestamp => {
  const date = new Date(timestamp * 1000);
  console.log('date: ', date);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return { day, month, year };
};

export const getAge = (day, month, year) => {
  const currentDate = new Date();
  const dob = new Date(Date.UTC(year, monthsArray.indexOf(month) - 1, day));

  console.log('currentDate: ', currentDate);
  console.log('day: ', day);
  console.log('month: ', month);
  console.log('year: ', year);
  console.log('dob: ', dob);

  const diff = new Date(currentDate - dob);
  return Math.abs(diff.getUTCFullYear() - 1971);
};
