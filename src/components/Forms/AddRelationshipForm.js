import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { addRelationship } from '../../firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipType from './Fields/RelationshipType';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';
import Notes from './Fields/Notes';

export default function AddRelationshipForm({ personId }) {
  return (
    <div className="container">
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            birthday: '',
            relationshiptype: '',
            notes: '',
            peopleId: personId,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              addRelationship(values)
                .then(docRef => {
                  console.log('Document written with ID: ', docRef.id);
                  setSubmitting(false);
                })
                .catch(error => {
                  console.error('Error adding document: ', error);
                  setSubmitting(false);
                });
              alert(JSON.stringify(values, null, 2));
            }, 400);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="formContainer">
              <RelationshipType isEditable />
              <FirstName isEditable />
              <LastName isEditable />
              <Birthday
                isEditable
                values={values}
                setFieldValue={setFieldValue}
              />
              <Email isEditable />
              <Address isEditable />
              <Notes isEditable />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
