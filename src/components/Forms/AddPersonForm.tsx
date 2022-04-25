import React, { useState } from 'react';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';

import { addPerson } from '@/services/firebase/firebaseapi';
import RelationshipTypeField from './Fields/RelationshipTypeField';
import Birthday from './Fields/Birthday';
import Links from './Fields/Links';
import { useUserContext } from '@/context/userContext';
import { ROUTE } from '@/routes/routeConstants';
import { useRouter } from 'next/router';
import { Box, Button, TextField } from '@mui/material';

export default function AddPersonForm() {
  const [isEditable, setIsEditable] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { user } = useUserContext();

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        relationshiptype: 'Friend',
        birthday: '',
        birthmonth: '',
        birthyear: '',
        email: '',
        address: '',
        links: [],
        notes: '',
        userId: user.uid,
      }}
      // validationSchema={SignupSchema}
      onSubmit={values => {
        // eslint-disable-next-line no-console
        console.log('values', values);
        addPerson(values)
          .then(docRef => {
            setIsEditable(false);
            enqueueSnackbar(`Successfully added ${values.firstName}`, {
              variant: 'success',
            });
            router.push(`${ROUTE.VIEW_PERSON}${docRef.id}`);
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('errorCode', errorCode);
            console.error('errorMessage', errorMessage);
            enqueueSnackbar(errorMessage, {
              variant: 'error',
            });
          });
      }}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        isSubmitting,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 400,
              width: '100%',
            }}
          >
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

            <RelationshipTypeField
              isEditable={isEditable}
              errors={errors}
              handleChange={handleChange}
              values={values}
            />
            <Birthday isEditable={isEditable} />
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

            <TextField
              id="address"
              name="address"
              label="Address"
              sx={{ mb: 2 }}
              value={values.address}
              onChange={handleChange}
              error={touched.address && Boolean(errors.address)}
              helperText={touched.address && errors.address}
            />

            <TextField
              id="notes"
              name="notes"
              label="Notes"
              sx={{ mb: 2 }}
              value={values.notes}
              onChange={handleChange}
              error={touched.notes && Boolean(errors.notes)}
              helperText={touched.notes && errors.notes}
            />

            <Links values={values} isEditable={isEditable} />

            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ maxWidth: 200 }}
              disabled={isSubmitting}
            >
              Create
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
