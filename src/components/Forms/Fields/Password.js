import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function Password({ title }) {
  return (
    <>
      <label htmlFor="password">Password</label>
      <Field type="password" name="password" placeholder={title} />
      <ErrorMessage name="password" component="div" />
    </>
  );
}
