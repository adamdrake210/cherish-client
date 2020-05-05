import React, { useState, useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import { monthsArray } from '../../../constants';
import { dateObjectFromTimeStamp } from '../../../helpers/dateHelpers';

export default function Birthday({ values, isEditable }) {
  const [day, setDay] = useState(null);
  const [birthMonth, setBirthMonth] = useState(null);
  const [year, setYear] = useState(null);

  // useEffect(() => {
  //   if (values.birthday) {
  //     const convertedDate = dateObjectFromTimeStamp(values.birthday);
  //     setDay(convertedDate.day);
  //     // console.log('day:', convertedDate.day);
  //   }
  // }, []);

  values.birthday = new Date(Date.UTC(year, birthMonth, day));

  console.log(values.day);

  return (
    <div className="field-container">
      <div className="field field-birthday">
        <div className="input-fields">
          <label htmlFor="birthday">Birthday</label>
          <input
            type="number"
            className="day-input"
            name="day"
            required
            disabled={!isEditable}
            placeholder="Day"
            autoComplete="off"
            onChange={e => setDay(e.target.value)}
          />
          <Field
            as="select"
            name="month"
            className="month-input"
            required
            onChange={e => setBirthMonth(monthsArray.indexOf(e.target.value))}
          >
            <option value="" disabled hidden>
              Choose month
            </option>
            {monthsArray.map(month => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Field>
          <input
            type="number"
            name="year"
            className="year-input"
            disabled={!isEditable}
            placeholder="Year"
            autoComplete="off"
            onChange={e => setYear(e.target.value)}
          />
        </div>
        <div className="helper-label">
          <p>E.g. 12 October 1983</p>
        </div>
      </div>
      <div className="error-message">
        <ErrorMessage name="birthday" component="div" />
      </div>
    </div>
  );
}
