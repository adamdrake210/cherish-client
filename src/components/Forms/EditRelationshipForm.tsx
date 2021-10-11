import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useSnackbar } from 'notistack';

import {
  updateRelationship,
  deleteDocument,
} from '@/services/firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipTypeField from './Fields/RelationshipTypeField';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';
import Notes from './Fields/Notes';
import Links from './Fields/Links';
import { RelationshipType } from '@/types/types';

type Props = {
  id: string;
  relationship: RelationshipType;
};

export default function EditRelationshipForm({ id, relationship }: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeletePerson = () => {
    deleteDocument(id, 'relationship')
      .then(() => {
        enqueueSnackbar(`Successfully deleted ${relationship.firstName}`, {
          variant: 'success',
        });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('errorCode', errorCode);
        enqueueSnackbar(errorMessage, {
          variant: 'error',
        });
      });
  };

  const {
    firstName,
    lastName,
    email,
    address,
    birthday,
    birthmonth,
    birthyear,
    relationshiptype,
    notes,
    links,
    peopleId,
  } = relationship;

  return (
    <div className="edit-form-container">
      <h3>
        {firstName} {lastName}:
      </h3>
      <div>
        <Formik
          initialValues={{
            firstName,
            lastName,
            email,
            birthday,
            birthmonth,
            birthyear,
            relationshiptype,
            address,
            notes,
            links,
            peopleId,
          }}
          onSubmit={(values, { setSubmitting }) => {
            updateRelationship(id, values)
              .then(() => {
                setSubmitting(false);
                setIsEditable(false);
                enqueueSnackbar(`Successfully edited ${values.firstName}`, {
                  variant: 'success',
                });
              })
              .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode);
                setSubmitting(false);
                enqueueSnackbar(errorMessage, {
                  variant: 'error',
                });
              });
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="formContainer">
              <RelationshipTypeField isEditable={isEditable} />
              <FirstName isEditable={isEditable} />
              <LastName isEditable={isEditable} />
              <Birthday isEditable={isEditable} />
              <Email isEditable={isEditable} />
              <Address isEditable={isEditable} />
              <Notes isEditable={isEditable} />
              <Links values={values} isEditable={isEditable} />

              {isEditable && (
                <div className="flex-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button button-sm button-green m-r-10"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="button button-sm button-white"
                    onClick={() =>
                      setIsEditable(prevIsEditable => !prevIsEditable)
                    }
                  >
                    Cancel
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
        {!isEditable && (
          <>
            <button
              type="button"
              className="button button-sm button-green m-r-10"
              onClick={() => setIsEditable(prevIsEditable => !prevIsEditable)}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDeletePerson}
              className="button button-sm button-red"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
