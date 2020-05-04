import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function Address({ isEditable }) {
  return (
    <div className="field-container">
      <div className="field">
        <label htmlFor="address">Address</label>
        <Field
          type="textarea"
          name="address"
          placeholder="Address"
          disabled={!isEditable}
        />
      </div>
      <div className="error-message">
        <ErrorMessage name="address" component="div" />
      </div>
    </div>
  );
}
