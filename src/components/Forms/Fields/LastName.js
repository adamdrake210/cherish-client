import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function LasttName({ isEditable }) {
  return (
    <>
      <label htmlFor="lastName">Last Name</label>
      <Field type="text" name="lastName" disabled={!isEditable} />
      <ErrorMessage name="lastName" component="div" />
    </>
  );
}
