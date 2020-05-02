import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function Email({ isEditable }) {
  const validateEmail = value => {
    let errorMessage;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errorMessage = 'Invalid email address';
    }
    return errorMessage;
  };

  return (
    <>
      <label htmlFor="email">Email</label>
      <Field
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="off"
        // validate={validateEmail}
        disabled={!isEditable}
      />
      <ErrorMessage name="email" component="div" />
    </>
  );
}
