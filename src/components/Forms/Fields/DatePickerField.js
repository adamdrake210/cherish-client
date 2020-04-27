import React from 'react';
import DatePicker from 'react-datepicker';

const DatePickerField = ({ name, value, onChange }) => {
  return (
    <DatePicker
      selected={(value && new Date(value)) || null}
      onChange={val => {
        onChange(name, val);
      }}
    />
  );
};

export default DatePickerField;
