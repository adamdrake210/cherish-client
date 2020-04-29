import React from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import Email from './Fields/Email';
import Password from './Fields/Password';

export default function LoginForm() {
  return (
    <div className="container">
      <div>
        <Formik
          initialValues={{
            email: '',
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
              <Email isEditable />
              <Password title="Enter Password here" />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <Link href="/register">
          <a>Create an account?</a>
        </Link>
      </div>
    </div>
  );
}
