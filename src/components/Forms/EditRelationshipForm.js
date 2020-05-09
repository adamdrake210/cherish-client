import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { updateRelationship } from '../../firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipType from './Fields/RelationshipType';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';
import Notes from './Fields/Notes';
import Links from './Fields/Links';

export default function EditRelationshipForm({ id, relationship }) {
  const [isEditable, setIsEditable] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    firstName,
    lastName,
    email,
    address,
    birthday,
    birthmonth,
    birthyear,
    relationshiptype,
    notes,
    links,
    peopleId,
  } = relationship;

  return (
    <div>
      <p>
        {firstName} {lastName}:
      </p>
      <div>
        <Formik
          initialValues={{
            firstName,
            lastName,
            email,
            birthday,
            birthmonth,
            birthyear,
            relationshiptype,
            address,
            notes,
            links,
            peopleId,
          }}
          onSubmit={(values, { setSubmitting }) => {
            updateRelationship(id, values)
              .then(() => {
                console.log('Document updated');
                setSubmitting(false);
                setSuccess(true);
                setIsEditable(false);
              })
              .catch(error => {
                console.error('Error adding document: ', error);
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="formContainer">
              <RelationshipType isEditable={isEditable} />
              <FirstName isEditable={isEditable} />
              <LastName isEditable={isEditable} />
              <Birthday isEditable={isEditable} />
              <Email isEditable={isEditable} />
              <Address isEditable={isEditable} />
              <Notes isEditable={isEditable} />
              <Links values={values} isEditable={isEditable} />

              {isEditable && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-lg button-green"
                >
                  Update
                </button>
              )}
            </Form>
          )}
        </Formik>
        {!isEditable && (
          <button
            type="button"
            className="button button-lg button-green"
            onClick={() => setIsEditable(prevIsEditable => !prevIsEditable)}
          >
            Edit
          </button>
        )}
        {success && (
          <p>{relationship.firstName}'s details have been updated.</p>
        )}
      </div>
    </div>
  );
}
