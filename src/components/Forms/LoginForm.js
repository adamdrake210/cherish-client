import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firebase } from '../../firebase/firebase';
import Email from './Fields/Email';
import Password from './Fields/Password';

export default function LoginForm() {
  const [firebaseError, setFirebaseError] = useState('');
  const router = useRouter();

  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  return (
    <div className="container">
      <div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              login(values.email, values.password)
                .then(response => {
                  setSubmitting(false);
                  router.push('/');
                  console.log(response);
                })
                .catch(error => {
                  setSubmitting(false);
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log('errorCode', errorCode);
                  console.log('errorMessage', errorMessage);
                  setFirebaseError(errorMessage);
                });
              alert(JSON.stringify(values, null, 2));
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="formContainer">
              <Email isEditable />
              <Password title="Enter Password here" />
              {firebaseError && <p>{firebaseError}</p>}
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
