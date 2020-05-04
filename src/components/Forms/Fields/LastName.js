import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function LasttName({ isEditable }) {
  return (
    <div className="field-container">
      <div className="field">
        <label htmlFor="lastName">Last Name</label>
        <Field type="text" name="lastName" disabled={!isEditable} />
      </div>
      <div className="error-message">
        <ErrorMessage name="lastName" component="div" />
      </div>
    </div>
  );
}
