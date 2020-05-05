import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function Password({ title }) {
  return (
    <div className="field-container">
      <div className="field">
        <label htmlFor="password">Password</label>
        <Field type="password" name="password" placeholder={title} />
      </div>
      <div className="error-message">
        <ErrorMessage name="password" component="div" />
      </div>
    </div>
  );
}
