import React from 'react';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';

import { addPerson, updatePerson } from '@/services/firebase/firebaseapi';
import RelationshipTypeField from './Fields/RelationshipTypeField';
import Birthday from './Fields/Birthday';
import Links from './Fields/Links';
import { useUserContext } from '@/context/userContext';
import { ROUTE } from '@/routes/routeConstants';
import { useRouter } from 'next/router';
import { Box, Button, TextField } from '@mui/material';
import { PersonType } from '@/types/types';

type Props = {
  id?: string;
  person?: PersonType;
};

export default function PersonForm({ id, person }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { user } = useUserContext();

  return (
    <Formik
      initialValues={{
        firstName: person?.firstName || '',
        lastName: person?.lastName || '',
        relationshiptype: person?.relationshiptype || 'Friend',
        birthday: person?.birthday || '',
        birthmonth: person?.birthmonth || '',
        birthyear: person?.birthyear || '',
        email: person?.email || '',
        address: person?.address || '',
        links: person?.links || [],
        notes: person?.notes || '',
        userId: user.uid,
      }}
      // validationSchema={SignupSchema}
      onSubmit={values => {
        // eslint-disable-next-line no-console
        console.log('values', values);
        if (id) {
          updatePerson(id, values)
            .then(() => {
              enqueueSnackbar(`Successfully edited ${values.firstName}`, {
                variant: 'success',
              });
              router.push(`${ROUTE.VIEW_PERSON}${id}`);
            })
            .catch(error => {
              console.error('Update Person Error: ', error.message);
              enqueueSnackbar(error.message, {
                variant: 'error',
              });
            });
        } else {
          addPerson(values)
            .then(docRef => {
              enqueueSnackbar(`Successfully added ${values.firstName}`, {
                variant: 'success',
              });
              router.push(`${ROUTE.VIEW_PERSON}${docRef.id}`);
            })
            .catch(error => {
              console.error('Add Person Error: ', error.message);
              enqueueSnackbar(error.message, {
                variant: 'error',
              });
            });
        }
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
              errors={errors}
              handleChange={handleChange}
              values={values}
            />
            <Birthday />
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

            <Links values={values} />

            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ maxWidth: 200 }}
              disabled={isSubmitting}
            >
              {id ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
