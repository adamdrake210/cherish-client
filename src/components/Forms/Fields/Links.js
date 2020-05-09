import React from 'react';
import { Field, FieldArray, ErrorMessage } from 'formik';

export default function Links({ values, isEditable }) {
  const validateUrl = value => {
    let errorMessage;
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    if (!pattern.test(value)) {
      errorMessage = 'Invalid url';
    }
    return errorMessage;
  };

  return (
    <div className="link-container">
      <h3>Useful Links:</h3>
      <FieldArray
        name="links"
        render={arrayHelpers => (
          <div>
            {values.links && values.links.length > 0 ? (
              values.links.map((link, index) => (
                <div className="link-input-container">
                  <div key={index} className="link-input">
                    <Field
                      name={`links.${index}`}
                      disabled={!isEditable}
                      validate={validateUrl}
                    />
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
                  <div className="error-message">
                    <ErrorMessage name={`links.${index}`} component="div" />
                  </div>
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
