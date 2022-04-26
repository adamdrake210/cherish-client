import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { auth } from '@/services/firebase/firebase';
import Password from '@/components/Forms/Fields/Password';
import GoogleLoginButton from '@/components/Login/GoogleLoginButton';
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
        {({ errors, touched, values, handleChange, isSubmitting }) => (
          <Form>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              sx={{ mb: 2 }}
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <TextField
              id="lastName"
              name="lastName"
              label="First Name"
              sx={{ mb: 2 }}
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              sx={{ mb: 2 }}
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
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
