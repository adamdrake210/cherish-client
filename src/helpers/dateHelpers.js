import moment from 'moment';
import { monthsArray } from '../constants/constants';

export const getIntlDateTimeString = dateObj => {
  const locale = 'en-US';
  const options = {
    day: 'numeric',
    month: 'long',
  };
  try {
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(
      `The following error occurred while formatting a date object to string --> ${error}`,
    );
    return 'unknown';
  }
};

// export const dateObjectFromTimeStamp = timestamp => {
//   const date = new Date(timestamp * 1000);
//   console.log('date: ', date);
//   const day = date.getDate();
//   const month = date.getMonth();
//   const year = date.getFullYear();

//   return { day, month, year };
// };

export const convertToMonthNumber = month => {
  return monthsArray.indexOf(month);
};

export const convertDateToTimeStamp = (day, month, year) => {
  return new Date(Date.UTC(year, convertToMonthNumber(month), day));
};

export const getAge = (day, month, year) => {
  if (!year || !month || !day) {
    return 'Unknown Age';
  }

  const dobMonth = convertToMonthNumber(month);
  const dob = moment([year, dobMonth, day]);

  return `${moment(new Date()).diff(dob, 'years')} yrs`;
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

export function sortBirthdays(array) {
  return array.sort((a, b) => a.birthday - b.birthday);
}

export function formatDate() {
  return moment().format('dddd, MMMM Do YYYY');
}
