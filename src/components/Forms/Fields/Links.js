import React from 'react';
import { Field, FieldArray, ErrorMessage } from 'formik';

export default function Links({ values, isEditable }) {
  return (
    <div className="link-container">
      <h3>Useful Links:</h3>
      <FieldArray
        name="links"
        render={arrayHelpers => (
          <div>
            {values.links && values.links.length > 0 ? (
              values.links.map((link, index) => (
                <div key={index} className="link-input">
                  <Field name={`links.${index}`} disabled={!isEditable} />
                  <button
                    type="button"
                    disabled={!isEditable}
                    className="button button-sm button-blue"
                    onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                  >
                    +
                  </button>
                  <button
                    type="button"
                    disabled={!isEditable}
                    className="button button-sm button-red"
                    onClick={() => arrayHelpers.remove(index)} // remove a link from the list
                  >
                    -
                  </button>
                </div>
              ))
            ) : (
              <button
                type="button"
                disabled={!isEditable}
                className="button button-sm button-blue"
                onClick={() => arrayHelpers.push('')}
              >
                {/* show this when user has removed all links from the list */}
                Add a link
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
}
