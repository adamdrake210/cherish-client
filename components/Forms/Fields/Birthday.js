import React from 'react';
import { ErrorMessage } from 'formik';
import DatePickerField from './DatePickerField';

export default function Birthday({ values, setFieldValue }) {
  return (
    <>
      <label htmlFor="birthday">Birthday</label>
      <DatePickerField
        name="birthday"
        value={values.birthday}
        onChange={setFieldValue}
      />
      <ErrorMessage name="birthday" component="div" />
    </>
  );
}
