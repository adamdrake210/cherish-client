import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { monthsArray } from '../../../constants';

export default function Birthday({ isEditable }) {
  return (
    <div className="field-container">
      <div className="field field-birthday">
        <div className="input-fields">
          <label htmlFor="birthday">Birthday</label>
          <Field
            type="number"
            className="day-input"
            name="birthday"
            required
            disabled={!isEditable}
            placeholder="Day"
          />
          <Field as="select" name="birthmonth" className="month-input" required>
            <option value="" disabled hidden>
              Choose month
            </option>
            {monthsArray.map(month => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Field>
        </div>

        <div className="input-fields">
          <label htmlFor="birthyear">Year of Birth</label>
          <Field
            type="number"
            name="birthyear"
            className="year-input"
            disabled={!isEditable}
            placeholder="Year"
            autoComplete="off"
          />
        </div>
        <div className="helper-label">
          <p>If you don't know the year - leave it blank</p>
        </div>
      </div>
      <div className="error-message">
        <ErrorMessage name="birthday" component="div" />
      </div>
    </div>
  );
}
