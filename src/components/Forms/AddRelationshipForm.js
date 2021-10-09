import React from 'react';
import { Formik, Form } from 'formik';
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
import { useSnackbarDispatch } from '@/context/snackbarContext';

export default function AddRelationshipForm({
  personId,
  setIsAddRelationship,
}) {
  const { user } = useUserContext();
  const snackbarDispatch = useSnackbarDispatch();

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
                snackbarDispatch({
                  type: 'show_snackbar',
                  payload: {
                    message: `Successfully added ${values.firstName}`,
                    variant: 'success',
                  },
                });
              })
              .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('errorCode', errorCode);
                console.log('errorMessage', errorMessage);
                setSubmitting(false);
                snackbarDispatch({
                  type: 'show_snackbar',
                  payload: {
                    message: errorMessage,
                    variant: 'error',
                  },
                });
              });
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="formContainer">
              <RelationshipTypeField isEditable />
              <FirstName isEditable />
              <LastName isEditable />
              <Birthday
                isEditable
                values={values}
                setFieldValue={setFieldValue}
              />
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
