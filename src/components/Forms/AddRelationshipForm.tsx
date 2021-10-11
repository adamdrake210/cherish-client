import React from 'react';
import { Formik, Form } from 'formik';
import { useSnackbar } from 'notistack';

import { addRelationship } from '@/services/firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipTypeField from './Fields/RelationshipTypeField';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';
import Notes from './Fields/Notes';
import Links from './Fields/Links';
import { useUserContext } from '@/context/userContext';

type Props = {
  personId: string;
  setIsAddRelationship: (arg: boolean) => void;
};

export default function AddRelationshipForm({
  personId,
  setIsAddRelationship,
}: Props) {
  const { user } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div>
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            birthday: '',
            birthmonth: '',
            birthyear: '',
            relationshiptype: '',
            address: '',
            links: '',
            notes: '',
            peopleId: personId,
            userId: user.uid,
          }}
          onSubmit={(values, { setSubmitting }) => {
            addRelationship(values)
              .then(() => {
                setSubmitting(false);
                setIsAddRelationship(false);
                enqueueSnackbar(`Successfully added ${values.firstName}`, {
                  variant: 'success',
                });
              })
              .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('errorCode', errorCode);
                console.error('errorMessage', errorMessage);
                setSubmitting(false);
                enqueueSnackbar(errorMessage, {
                  variant: 'error',
                });
              });
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="formContainer">
              <RelationshipTypeField isEditable />
              <FirstName isEditable />
              <LastName isEditable />
              <Birthday isEditable />
              <Email isEditable />
              <Address isEditable />
              <Notes isEditable />
              <Links values={values} isEditable />
              <button
                type="submit"
                disabled={isSubmitting}
                className="button button-lg button-green"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
