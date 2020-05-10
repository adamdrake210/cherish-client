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

// export const convertDateToTimeStamp = (day, month, year) => {
//   return new Date(Date.UTC(year, convertToMonthNumber(month), day));
// };

export const getAge = (day, month, year) => {
  if (!year) {
    return 'no year was selected. Unable to provide age.';
  }

  const dobMonth = convertToMonthNumber(month);
  const dob = moment([year, dobMonth, day]);

  return moment(new Date()).diff(dob, 'years');
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
