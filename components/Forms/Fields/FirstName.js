import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function FirstName({ isEditable }) {
  return (
    <>
      <label htmlFor="firstName">First name</label>
      <Field type="text" name="firstName" required disabled={!isEditable} />
      <ErrorMessage name="firstName" component="div" />
    </>
  );
}
