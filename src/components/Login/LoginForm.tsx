import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as Yup from 'yup';

import { auth } from '@/services/firebase/firebase';
import { ROUTE } from '@/routes/routeConstants';
import GoogleLoginButton from '@/components/Login/GoogleLoginButton';

export default function LoginForm() {
  const [firebaseError, setFirebaseError] = useState(null);
  const router = useRouter();

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <>
      <GoogleLoginButton
        setFirebaseError={setFirebaseError}
        title="Google Login"
      />
      <Typography variant="h6" sx={{ my: 2 }}>
        or
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          login(values.email, values.password)
            .then(() => {
              setFirebaseError(null);
              setSubmitting(false);
              router.push('/');
            })
            .catch(error => {
              setSubmitting(false);
              const errorMessage = error.message;
              console.error('LoginError: ', errorMessage);
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
                sx={{ mb: 2, minWidth: 250 }}
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                sx={{ mb: 2, minWidth: 250 }}
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <Button
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ my: 2, minWidth: 150 }}
                disabled={isSubmitting}
              >
                Login
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
        <Link href={ROUTE.RESET_PASSWORD}>
          <MuiLink
            sx={{
              mr: 2,
              color: 'primary.dark',
              ':hover': { cursor: 'pointer' },
            }}
          >
            Forgot Password?
          </MuiLink>
        </Link>
        <Link href={ROUTE.REGISTER}>
          <MuiLink
            sx={{ color: 'primary.dark', ':hover': { cursor: 'pointer' } }}
          >
            Create an account?
          </MuiLink>
        </Link>
      </Box>
    </>
  );
}
