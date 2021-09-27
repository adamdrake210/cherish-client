import React from 'react';
import { Field, ErrorMessage } from 'formik';

type Props = {
  isEditable: boolean;
  noLabel?: boolean;
};

export default function Email({ isEditable, noLabel }: Props) {
  const validateEmail = value => {
    let errorMessage;
    if (
      value &&
      // eslint-disable-next-line no-useless-escape
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value,
      )
    ) {
      errorMessage = 'Invalid email address';
    }
    return errorMessage;
  };

  return (
    <div className="field-container">
      <div className="field">
        {!noLabel && <label htmlFor="email">Email</label>}
        <Field
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          validate={validateEmail}
          disabled={!isEditable}
        />
      </div>
      <div className="error-message">
        <ErrorMessage name="email" component="div" />
      </div>
    </div>
  );
}
