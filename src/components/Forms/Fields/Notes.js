import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function Notes({ isEditable }) {
  return (
    <div className="field-container">
      <div className="field">
        <label htmlFor="address">Notes</label>
        <Field
          type="textarea"
          name="notes"
          placeholder="notes"
          disabled={!isEditable}
        />
      </div>
      <div className="error-message">
        <ErrorMessage name="notes" component="div" />
      </div>
    </div>
  );
}
