import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '@/services/firebase/firebase';
import FirstName from '../Forms/Fields/FirstName';
import LastName from '../Forms/Fields/LastName';
import Email from '../Forms/Fields/Email';
import Password from '../Forms/Fields/Password';
import GoogleLoginButton from '../Login/GoogleLoginButton';
import { ROUTE } from '@/routes/routeConstants';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterForm() {
  const [firebaseError, setFirebaseError] = useState(null);
  const router = useRouter();

  async function register(email: string, password: string) {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    return newUser.user;
  }

  return (
    <div className="login-container-form">
      <GoogleLoginButton
        setFirebaseError={setFirebaseError}
        title="Register with Google"
      />
      <p>or</p>
      <h3>Sign up with Email</h3>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          register(values.email, values.password)
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
              console.error('errorMessage', errorMessage);
              setFirebaseError(errorMessage);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="formContainer">
            <FirstName isEditable noLabel />
            <LastName isEditable noLabel />
            <Email isEditable noLabel />
            <Password title="Choose a secure password" noLabel />
            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-lg button-blue m-t-5 m-b-20"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      {firebaseError && <p>{firebaseError}</p>}
      <div className="login-link-container">
        <Link href={ROUTE.LOGIN}>
          <a>Already have an account?</a>
        </Link>
      </div>
    </div>
  );
}
