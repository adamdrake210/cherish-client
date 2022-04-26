import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { TextField } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '@/services/firebase/firebase';

export default function ResetPasswordForm() {
  const [firebaseError, setFirebaseError] = useState(null);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [loading, setLoading] = useState(false);

  function resetPassword(email: string) {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  }
  return (
    <div className="login-container-form">
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          resetPassword(values.email)
            .then(response => {
              setLoading(false);
              setIsPasswordReset(true);
              setSubmitting(false);
              setFirebaseError(null);
              console.error(response);
            })
            .catch(error => {
              setLoading(false);
              setSubmitting(false);
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error('errorCode', errorCode);
              console.error('errorMessage', errorMessage);
              setFirebaseError(errorMessage);
            });
        }}
      >
        {({ errors, touched, values, handleChange, isSubmitting }) => (
          <Form className="formContainer">
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-lg button-blue m-t-5 m-b-20"
            >
              Reset Password
            </button>
          </Form>
        )}
      </Formik>
      {loading && <p>Loading...</p>}
      {isPasswordReset && <p>Check Email to reset password.</p>}
      {firebaseError && <p>{firebaseError}</p>}
    </div>
  );
}
