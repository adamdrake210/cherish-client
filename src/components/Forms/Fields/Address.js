import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function Address({ isEditable }) {
  return (
    <>
      <label htmlFor="address">Address</label>
      <Field
        type="textarea"
        name="address"
        placeholder="Address"
        disabled={!isEditable}
      />
      <ErrorMessage name="address" component="div" />
    </>
  );
}
