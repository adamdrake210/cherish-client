import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { daysArray, monthsArray } from '../../../constants';
import { createYearsArray } from '../../../helpers/dateHelpers';

export default function Birthday({ isEditable }) {
  return (
    <div className="field-container">
      <div className="field field-birthday">
        <div className="input-fields">
          <label htmlFor="birthday">Birthday</label>
          <Field
            as="select"
            name="birthday"
            className="month-input"
            disabled={!isEditable}
          >
            <option value="" disabled hidden>
              Day
            </option>
            {daysArray.slice(1).map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Field>
          <Field
            as="select"
            name="birthmonth"
            className="month-input"
            disabled={!isEditable}
          >
            <option value="" disabled hidden>
              Month
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
            as="select"
            name="birthyear"
            className="month-input"
            disabled={!isEditable}
          >
            <option value="" disabled hidden>
              Year
            </option>
            {createYearsArray('June 26, 1915 11:13:00')
              .reverse()
              .map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </Field>
        </div>
        <div className="helper-label">
          <p>If you don't know the brithday you can leave it blank</p>
        </div>
      </div>
      <div className="error-message">
        <ErrorMessage name="birthday" component="div" />
      </div>
    </div>
  );
}
