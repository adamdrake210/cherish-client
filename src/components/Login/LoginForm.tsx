import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firebase } from '@/services/firebase/firebase';
import Email from '../Forms/Fields/Email';
import Password from '../Forms/Fields/Password';
import GoogleLoginButton from '@/components/Login/GoogleLoginButton';
import { ROUTE } from '@/routes/routeConstants';

export default function LoginForm() {
  const [firebaseError, setFirebaseError] = useState(null);
  const router = useRouter();

  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  return (
    <div className="login-container-form">
      <GoogleLoginButton
        setFirebaseError={setFirebaseError}
        title="Google Login"
      />
      <p>or</p>
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
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error('errorCode', errorCode);
              setFirebaseError(errorMessage);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Email isEditable noLabel />
            <Password title="Password" noLabel />
            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-lg button-blue m-t-5 m-b-20"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>

      {firebaseError && <p className="error-message">{firebaseError}</p>}
      <div className="login-link-container">
        <Link href={ROUTE.RESET_PASSWORD}>
          <a>Forgot Password?</a>
        </Link>
        <Link href={ROUTE.REGISTER}>
          <a>Create an account?</a>
        </Link>
      </div>
    </div>
  );
}
