import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { addPerson } from '../../firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipType from './Fields/RelationshipType';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';
import Notes from './Fields/Notes';
import Links from './Fields/Links';
import { useUserContext } from '../../context/userContext';

export default function AddPersonForm({ success, setSuccess, setPersonId }) {
  const [newPersonId, setNewPersonId] = useState(null);
  const [isEditable, setIsEditable] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  const { user } = useUserContext();
  return (
    <div>
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            relationshiptype: '',
            birthday: '',
            email: '',
            address: '',
            links: [''],
            notes: '',
            userId: user.uid,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              addPerson(values)
                .then(docRef => {
                  console.log('Document written with ID: ', docRef.id);
                  setSubmitting(false);
                  setPersonId(docRef.id);
                  setNewPersonId(docRef.id);
                  setIsEditable(false);
                  setSuccess(true);
                })
                .catch(error => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log('errorCode', errorCode);
                  console.log('errorMessage', errorMessage);
                  setFirebaseError(errorMessage);
                  setSubmitting(false);
                });
              alert(JSON.stringify(values, null, 2));
            }, 400);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="formContainer">
              <FirstName isEditable={isEditable} />
              <LastName isEditable={isEditable} />
              <RelationshipType isEditable={isEditable} />
              <Birthday values={values} isEditable={isEditable} />
              <Email isEditable={isEditable} />
              <Address isEditable={isEditable} />
              <Notes isEditable={isEditable} />

              <Links values={values} />

              {!success && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-lg button-green"
                >
                  Submit
                </button>
              )}
            </Form>
          )}
        </Formik>
        {newPersonId && (
          <Link passHref href={`/edit-person/${newPersonId}`}>
            <a>Edit Person</a>
          </Link>
        )}
        {success && <p>This person has been added to your contacts!</p>}
        {firebaseError && <p>{firebaseError}</p>}
      </div>
    </div>
  );
}
