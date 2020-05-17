import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firebase } from '../../firebase/firebase';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Email from './Fields/Email';
import Password from './Fields/Password';
import GoogleLoginButton from '../GoogleLoginButton';

export default function RegisterForm() {
  const [firebaseError, setFirebaseError] = useState(null);
  const router = useRouter();

  async function register(firstName, email, password) {
    const newUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return newUser.user.updateProfile({
      displayName: firstName,
    });
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
          register(values.firstName, values.email, values.password)
            .then(() => {
              setFirebaseError(null);
              setSubmitting(false);
              router.push('/');
            })
            .catch(error => {
              setSubmitting(false);
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log('errorCode', errorCode);
              console.log('errorMessage', errorMessage);
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
        <Link href="/login">
          <a>Already have an account?</a>
        </Link>
      </div>
    </div>
  );
}
