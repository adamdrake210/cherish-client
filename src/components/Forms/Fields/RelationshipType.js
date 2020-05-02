import React from 'react';
import { Field, ErrorMessage } from 'formik';
import relationshipTypeArray from '../../../constants';

export default function RelationshipType({ isEditable }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <label htmlFor="relationshiptype">Relationship</label>
      <Field
        as="select"
        name="relationshiptype"
        required
        disabled={!isEditable}
      >
        <option value="" disabled hidden>
          Choose here
        </option>
        {relationshipTypeArray.map(relationship => (
          <option key={relationship} value={relationship}>
            {capitalizeFirstLetter(relationship)}
          </option>
        ))}
      </Field>
      <ErrorMessage name="relationshiptype" component="div" />
    </>
  );
}
