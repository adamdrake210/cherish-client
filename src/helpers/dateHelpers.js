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

  return { day };
};
