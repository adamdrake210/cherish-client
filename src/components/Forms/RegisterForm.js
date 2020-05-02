import React from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { firebase } from '../../firebase/firebase';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Email from './Fields/Email';
import Password from './Fields/Password';

export default function RegisterForm() {
  async function register(firstName, email, password) {
    const newUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return newUser.user.updateProfile({
      displayName: firstName,
    });
  }

  return (
    <div className="container">
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              register(values.firstName, values.email, values.password)
                .then(() => {
                  setSubmitting(false);
                })
                .catch(error => {
                  setSubmitting(false);
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log('errorCode', errorCode);
                  console.log('errorMessage', errorMessage);
                  // ...
                });
              alert(JSON.stringify(values, null, 2));
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="formContainer">
              <FirstName isEditable />
              <LastName isEditable />
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
