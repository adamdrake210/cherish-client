import moment from 'moment';
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

export const convertDateToTimeStamp = (day, month, year) => {
  return new Date(Date.UTC(year, monthsArray.indexOf(month) - 1, day));
};

export const getAge = (day, month, year) => {
  if (!year) {
    return 'no year was selected. Unable to provide age.';
  }

  const currentDate = new Date();
  const dob = convertDateToTimeStamp(day, month, year);

  const currentMonth = moment().month();
  const currentDay = moment().date();
  const dobMonth = monthsArray.indexOf(month);

  const years = moment(currentDate).diff(dob, 'years');

  if (currentMonth < dobMonth) {
    return years - 1;
  }
  if (currentMonth === dobMonth && currentDay < day) {
    return years - 1;
  }

  return years;
};

export const createYearsArray = startDate => {
  const Start = new Date(startDate);
  const End = new Date();
  const years = moment(End).diff(Start, 'years');
  const yearsBetween = [];
  for (let year = 0; year < years + 2; year += 1) {
    yearsBetween.push(Start.getFullYear() + year);
  }
  return yearsBetween;
};
