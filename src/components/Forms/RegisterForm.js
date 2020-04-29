import React from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Email from './Fields/Email';
import Password from './Fields/Password';

export default function RegisterForm() {
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
              <FirstName />
              <LastName />
              <Email isEditable />
              <Password title="Choose a secure password" />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <Link href="/login">
          <a>Already have an account?</a>
        </Link>
      </div>
    </div>
  );
}
