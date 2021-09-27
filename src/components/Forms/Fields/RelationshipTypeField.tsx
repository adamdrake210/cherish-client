import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { relationshipTypeArray } from '../../../constants';
import { capitalizeFirstLetter } from '../../../helpers/helpers';

type Props = {
  isEditable: boolean;
};

export default function RelationshipTypeField({ isEditable }: Props) {
  return (
    <div className="field-container">
      <div className="field">
        <label htmlFor="relationshiptype">Relationship*</label>
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
      </div>
      <div className="error-message">
        <ErrorMessage name="relationshiptype" component="div" />
      </div>
    </div>
  );
}
