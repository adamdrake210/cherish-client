import React from 'react';
import { Formik, Form } from 'formik';
import { addRelationship } from '../../firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipType from './Fields/RelationshipType';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';
import Notes from './Fields/Notes';
import Links from './Fields/Links';
import { useUserContext } from '../../context/userContext';

export default function AddRelationshipForm({
  personId,
  setIsAddRelationship,
}) {
  const { user } = useUserContext();

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
              .then(docRef => {
                console.log('Document written with ID: ', docRef.id);
                setSubmitting(false);
                setIsAddRelationship(false);
              })
              .catch(error => {
                console.error('Error adding document: ', error);
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="formContainer">
              <RelationshipType isEditable />
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
