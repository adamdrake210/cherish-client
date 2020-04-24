import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addRelationship } from '../../firebase/firebaseapi';

export default function AddRelationshipForm({ personId }) {
  return (
    <div className="container">
      <p>Form for this id: {personId}</p>
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            birthday: '',
            relationshiptype: '',
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
          {({ isSubmitting }) => (
            <Form className="formContainer">
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="firstName" required />

              <ErrorMessage name="firstName" component="div" />
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" required />
              <ErrorMessage name="lastName" component="div" />
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" placeholder="Email" required />
              <ErrorMessage name="email" component="div" />
              <label htmlFor="birthday">Birthday</label>
              <Field type="text" name="birthday" required />
              <ErrorMessage name="birthday" component="div" />
              <label htmlFor="relationshiptype">Relationship</label>
              <Field type="text" name="relationshiptype" required />
              <ErrorMessage name="relationshiptype" component="div" />
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
