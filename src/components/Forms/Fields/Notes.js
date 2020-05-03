import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function Notes({ isEditable }) {
  return (
    <>
      <label htmlFor="address">Notes</label>
      <Field
        type="textarea"
        name="notes"
        placeholder="notes"
        disabled={!isEditable}
      />
      <ErrorMessage name="notes" component="div" />
    </>
  );
}
