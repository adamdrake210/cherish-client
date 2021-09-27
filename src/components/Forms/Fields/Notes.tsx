import React from 'react';
import { Field, ErrorMessage } from 'formik';

type Props = {
  isEditable: boolean;
};

export default function Notes({ isEditable }: Props) {
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
