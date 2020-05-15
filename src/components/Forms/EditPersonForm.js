import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import router from 'next/router';
import { updatePerson, deleteDocument } from '../../firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipType from './Fields/RelationshipType';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';
import Notes from './Fields/Notes';
import Links from './Fields/Links';
import { useSnackbarDispatch } from '../../context/snackbarContext';

export default function EditPersonForm({ id, person }) {
  const [isEditable, setIsEditable] = useState(false);
  const snackbarDispatch = useSnackbarDispatch();

  const handleDeletePerson = () => {
    deleteDocument(id, 'people')
      .then(() => {
        snackbarDispatch({
          type: 'show_snackbar',
          payload: {
            message: `Successfully deleted ${person.firstName}`,
            variant: 'success',
          },
        });
        router.push('/');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode', errorCode);
        snackbarDispatch({
          type: 'show_snackbar',
          payload: {
            message: errorMessage,
            variant: 'error',
          },
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
  } = person;

  return (
    <div className="edit-form-container">
      <div>
        <Formik
          initialValues={{
            firstName,
            lastName,
            relationshiptype,
            birthday,
            birthmonth,
            birthyear,
            email,
            address,
            notes,
            links,
          }}
          onSubmit={(values, { setSubmitting }) => {
            updatePerson(id, values)
              .then(() => {
                setSubmitting(false);
                setIsEditable(false);
                snackbarDispatch({
                  type: 'show_snackbar',
                  payload: {
                    message: `Successfully edited ${values.firstName}`,
                    variant: 'success',
                  },
                });
              })
              .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode);
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
              <RelationshipType isEditable={isEditable} />
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
              onClick={() => setIsEditable(prevIsEditable => !prevIsEditable)}
              className="button button-sm button-green m-r-10"
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
