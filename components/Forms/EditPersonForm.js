import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addPerson } from '../../firebase/firebaseapi';

// TODO Do this.
export default function EditPersonForm({ success, setSuccess, setPersonId }) {
  return (
    <div className="container">
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            birthday: '',
            userId: 'gbm98V9ySiU46PvoebGH',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              addPerson(values)
                .then(docRef => {
                  console.log('Document written with ID: ', docRef.id);
                  setSubmitting(false);
                  setPersonId(docRef.id);
                  setSuccess(true);
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
        {success && <p>This person has been added to your contacts!</p>}
      </div>
    </div>
  );
}
