import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { updatePerson } from '../../firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipType from './Fields/RelationshipType';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';
import Notes from './Fields/Notes';
import Links from './Fields/Links';

export default function EditPersonForm({ id, person }) {
  const [isEditable, setIsEditable] = useState(true);
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
  } = person;

  return (
    <div>
      <div>
        <Formik
          initialValues={{
            firstName,
            lastName,
            relationshiptype,
            birthday,
            birthmonth,
            birthyear,
            email,
            address,
            notes,
            links,
          }}
          onSubmit={(values, { setSubmitting }) => {
            updatePerson(id, values)
              .then(docRef => {
                console.log('Document written with ID: ', docRef);
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
              <FirstName isEditable={isEditable} />
              <LastName isEditable={isEditable} />
              <RelationshipType isEditable={isEditable} />
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
            onClick={() => setIsEditable(prevIsEditable => !prevIsEditable)}
            className="button button-lg button-green"
          >
            Edit
          </button>
        )}
        {success && <p>{person.firstName}'s details have been updated.</p>}
      </div>
    </div>
  );
}
