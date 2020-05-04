import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function FirstName({ isEditable }) {
  return (
    <div className="field-container">
      <div className="field">
        <label htmlFor="firstName">First name</label>
        <Field type="text" name="firstName" required disabled={!isEditable} />
      </div>
      <div className="error-message">
        <ErrorMessage name="firstName" component="div" />
      </div>
    </div>
  );
}
