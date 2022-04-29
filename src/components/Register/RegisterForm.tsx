import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { auth } from '@/services/firebase/firebase';
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

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <>
      <GoogleLoginButton
        setFirebaseError={setFirebaseError}
        title="Register with Google"
      />
      <Typography variant="h6" sx={{ my: 2 }}>
        or
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        Sign up with Email
      </Typography>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
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
          <Form autoComplete="off">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                id="firstName"
                name="firstName"
                label="First Name*"
                sx={{ mb: 2, minWidth: 250 }}
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name*"
                sx={{ mb: 2, minWidth: 250 }}
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                id="email"
                name="email"
                label="Email*"
                sx={{ mb: 2, minWidth: 250 }}
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                id="password"
                name="password"
                label="Choose a Secure Password*"
                type="password"
                sx={{ mb: 2, minWidth: 250 }}
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                sx={{ minWidth: 150, my: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {firebaseError && (
        <Typography color="error" gutterBottom>
          {firebaseError}
        </Typography>
      )}
      <Box>
        <Link href={ROUTE.LOGIN}>
          <MuiLink
            sx={{ color: 'primary.dark', ':hover': { cursor: 'pointer' } }}
          >
            Already have an account?
          </MuiLink>
        </Link>
      </Box>
    </>
  );
}
