import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function FirstName({ isEditable, noLabel }) {
  return (
    <div className="field-container">
      <div className="field">
        {!noLabel && <label htmlFor="firstName">First name*</label>}
        <Field
          type="text"
          name="firstName"
          required
          disabled={!isEditable}
          autoComplete="off"
          placeholder={!noLabel ? '' : 'First Name*'}
        />
      </div>
      <div className="error-message">
        <ErrorMessage name="firstName" component="div" />
      </div>
    </div>
  );
}
