import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { addPerson } from '../../services/firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipTypeField from './Fields/RelationshipTypeField';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';
import Notes from './Fields/Notes';
import Links from './Fields/Links';
import { useUserContext } from '../../context/userContext';
import { useSnackbarDispatch } from '../../context/snackbarContext';
import { ROUTE } from '@/routes/routeConstants';

type Props = {
  success: boolean;
  setSuccess: (arg: boolean) => void;
  setPersonId: (arg: string) => void;
};

export default function AddPersonForm({
  success,
  setSuccess,
  setPersonId,
}: Props) {
  const [newPersonId, setNewPersonId] = useState(null);
  const [isEditable, setIsEditable] = useState(true);
  const snackbarDispatch = useSnackbarDispatch();

  const { user } = useUserContext();
  return (
    <div>
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            relationshiptype: '',
            birthday: '',
            birthmonth: '',
            birthyear: '',
            email: '',
            address: '',
            links: [],
            notes: '',
            userId: user.uid,
          }}
          onSubmit={(values, { setSubmitting }) => {
            addPerson(values)
              .then(docRef => {
                setSubmitting(false);
                setPersonId(docRef.id);
                setNewPersonId(docRef.id);
                setIsEditable(false);
                snackbarDispatch({
                  type: 'show_snackbar',
                  payload: {
                    message: `Successfully added ${values.firstName}`,
                    variant: 'success',
                  },
                });
                setSuccess(true);
              })
              .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('errorCode', errorCode);
                console.error('errorMessage', errorMessage);
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
          {({ isSubmitting, values }) => (
            <Form className="formContainer">
              <FirstName isEditable={isEditable} />
              <LastName isEditable={isEditable} />
              <RelationshipTypeField isEditable={isEditable} />
              <Birthday isEditable={isEditable} />
              <Email isEditable={isEditable} />
              <Address isEditable={isEditable} />
              <Notes isEditable={isEditable} />

              <Links values={values} isEditable={isEditable} />

              {!success && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-lg button-green"
                >
                  Submit
                </button>
              )}
            </Form>
          )}
        </Formik>
        {newPersonId && (
          <Link
            passHref
            href={ROUTE.EDIT_PERSON_DETAIL}
            as={`/edit-person/${newPersonId}`}
          >
            <a>Edit Person</a>
          </Link>
        )}
      </div>
    </div>
  );
}
