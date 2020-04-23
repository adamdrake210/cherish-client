import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { firestore } from '../../firebase/firebase';
import Users from '../../components/Users';

export default function Homepage() {
  return (
    <div className="container">
      <div>
        <h1>Cherish</h1>
        <h2>User</h2>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            birthday: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // eslint-disable-next-line no-alert
              firestore
                .collection('users')
                .add(values)
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
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <Users />
      </div>
    </div>
  );
}
