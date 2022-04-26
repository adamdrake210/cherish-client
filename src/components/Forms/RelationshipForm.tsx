import React from 'react';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';

import {
  addRelationship,
  updateRelationship,
} from '@/services/firebase/firebaseapi';
import RelationshipTypeField from './Fields/RelationshipTypeField';
import Birthday from './Fields/Birthday';
import Links from './Fields/Links';
import { useUserContext } from '@/context/userContext';
import { ROUTE } from '@/routes/routeConstants';
import { useRouter } from 'next/router';
import { Box, Button, TextField } from '@mui/material';
import { Relation } from '@/types/types';

type Props = {
  id?: string;
  relation?: Relation;
};

export default function RelationshipForm({ id, relation }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { user } = useUserContext();

  // const handleDeletePerson = () => {
  //   deleteDocument(id, 'relationship')
  //     .then(() => {
  //       enqueueSnackbar(`Successfully deleted ${relationship.firstName}`, {
  //         variant: 'success',
  //       });
  //     })
  //     .catch(error => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.error('errorCode', errorCode);
  //       enqueueSnackbar(errorMessage, {
  //         variant: 'error',
  //       });
  //     });
  // };

  return (
    <Formik
      initialValues={{
        firstName: relation?.firstName || '',
        lastName: relation?.lastName || '',
        relationshiptype: relation?.relationshiptype || 'Friend',
        birthday: relation?.birthday || '',
        birthmonth: relation?.birthmonth || '',
        birthyear: relation?.birthyear || '',
        email: relation?.email || '',
        address: relation?.address || '',
        links: relation?.links || [],
        notes: relation?.notes || '',
        peopleId: relation?.peopleId || id,
        userId: user.uid,
      }}
      // validationSchema={SignupSchema}
      onSubmit={values => {
        if (relation) {
          updateRelationship(id, values)
            .then(() => {
              enqueueSnackbar(`Successfully edited ${values.firstName}`, {
                variant: 'success',
              });
              router.push(`${ROUTE.VIEW_PERSON}${values.peopleId}`);
            })
            .catch(error => {
              console.error('Update Relationship Error: ', error.message);
              enqueueSnackbar(error.message, {
                variant: 'error',
              });
            });
        } else {
          addRelationship(values)
            .then(() => {
              enqueueSnackbar(`Successfully added ${values.firstName}`, {
                variant: 'success',
              });
              router.push(`${ROUTE.VIEW_PERSON}${id}`);
            })
            .catch(error => {
              console.error('Add Relationship Error: ', error.message);
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
            <RelationshipTypeField
              errors={errors}
              handleChange={handleChange}
              values={values}
            />
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
