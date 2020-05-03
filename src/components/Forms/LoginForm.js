import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firebase } from '../../firebase/firebase';
import Email from './Fields/Email';
import Password from './Fields/Password';

export default function LoginForm() {
  const [firebaseError, setFirebaseError] = useState(null);
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
            login(values.email, values.password)
              .then(() => {
                setFirebaseError(null);
                setSubmitting(false);
                router.push('/');
              })
              .catch(error => {
                setSubmitting(false);
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('errorCode', errorCode);
                setFirebaseError(errorMessage);
              });
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
        {firebaseError && <p>{firebaseError}</p>}
        <div className="login-link-container">
          <Link href="/reset-password">
            <a>Forgot Password?</a>
          </Link>
          <Link href="/register">
            <a>Create an account?</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
