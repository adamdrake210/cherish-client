import React from 'react';
import { Field, ErrorMessage } from 'formik';

type Props = {
  isEditable: boolean;
  noLabel?: boolean;
};

export default function LasttName({ isEditable, noLabel }: Props) {
  return (
    <div className="field-container">
      <div className="field">
        {!noLabel && <label htmlFor="lastName">Last Name</label>}
        <Field
          type="text"
          name="lastName"
          disabled={!isEditable}
          placeholder={!noLabel ? '' : 'Last Name'}
        />
      </div>
      <div className="error-message">
        <ErrorMessage name="lastName" component="div" />
      </div>
    </div>
  );
}
