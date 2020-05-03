import React from 'react';
import { Field, FieldArray, ErrorMessage } from 'formik';

export default function Links({ values }) {
  return (
    <>
      <h3>Useful Links</h3>
      <FieldArray
        name="links"
        render={arrayHelpers => (
          <div>
            {values.links && values.links.length > 0 ? (
              values.links.map((link, index) => (
                <div key={index}>
                  <Field name={`links.${index}`} />
                  <button
                    type="button"
                    onClick={() => arrayHelpers.remove(index)} // remove a link from the list
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                  >
                    +
                  </button>
                </div>
              ))
            ) : (
              <button type="button" onClick={() => arrayHelpers.push('')}>
                {/* show this when user has removed all links from the list */}
                Add a link
              </button>
            )}
          </div>
        )}
      />
    </>
  );
}
