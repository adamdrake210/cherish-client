import React from 'react';
import { ErrorMessage } from 'formik';
import DatePickerField from './DatePickerField';

export default function Birthday({ values, setFieldValue }) {
  return (
    <div className="field-container">
      <div className="field">
        <label htmlFor="birthday">Birthday</label>
        <DatePickerField
          name="birthday"
          value={values.birthday}
          onChange={setFieldValue}
        />
      </div>
      <div className="error-message">
        <ErrorMessage name="birthday" component="div" />
      </div>
    </div>
  );
}
