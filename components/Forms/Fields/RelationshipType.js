import React from 'react';
import { Field, ErrorMessage } from 'formik';
import relationshipTypeArray from '../../../constants';

export default function RelationshipType({ isEditable }) {
  return (
    <>
      <label htmlFor="relationshiptype">Relationship</label>
      <Field
        as="select"
        name="relationshiptype"
        required
        disabled={!isEditable}
      >
        {relationshipTypeArray.map(relationship => (
          <option key={relationship} value={relationship}>
            {relationship}
          </option>
        ))}
      </Field>
      <ErrorMessage name="relationshiptype" component="div" />
    </>
  );
}
