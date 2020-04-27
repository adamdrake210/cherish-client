import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function Comments({ isEditable }) {
  return (
    <>
      <label htmlFor="address">Comments</label>
      <Field
        type="textarea"
        name="comments"
        placeholder="comments"
        disabled={!isEditable}
      />
      <ErrorMessage name="comments" component="div" />
    </>
  );
}
