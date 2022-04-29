import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import * as Yup from 'yup';

import { auth } from '@/services/firebase/firebase';
import Loader from '../Common/Loaders/Loader';

export default function ResetPasswordForm() {
  const [firebaseError, setFirebaseError] = useState(null);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [loading, setLoading] = useState(false);

  function resetPassword(email: string) {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          resetPassword(values.email)
            .then(() => {
              setLoading(false);
              setIsPasswordReset(true);
              setSubmitting(false);
              setFirebaseError(null);
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
          <Form autoComplete="off">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                sx={{ mb: 1, minWidth: 250 }}
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ my: 1 }}
                disabled={isSubmitting}
              >
                Reset Password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {loading && <Loader />}
      {isPasswordReset && (
        <Typography variant="h5" gutterBottom>
          Check Email to reset password.
        </Typography>
      )}
      {firebaseError && (
        <Typography color="error" gutterBottom>
          {firebaseError}
        </Typography>
      )}
    </>
  );
}
