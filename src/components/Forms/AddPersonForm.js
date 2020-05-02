import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addPerson } from '../../firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipType from './Fields/RelationshipType';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';
import Notes from './Fields/Notes';
import { useUserContext } from '../../context/userContext';

export default function AddPersonForm({ success, setSuccess, setPersonId }) {
  const { user } = useUserContext();
  return (
    <div className="container">
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            relationshiptype: '',
            birthday: '',
            email: '',
            address: '',
            link_1: '',
            notes: '',
            userId: user.uid,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              addPerson(values)
                .then(docRef => {
                  console.log('Document written with ID: ', docRef.id);
                  setSubmitting(false);
                  setPersonId(docRef.id);
                  setSuccess(true);
                })
                .catch(error => {
                  console.error('Error adding document: ', error);
                  setSubmitting(false);
                });
              alert(JSON.stringify(values, null, 2));
            }, 400);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="formContainer">
              <FirstName isEditable />
              <LastName isEditable />
              <RelationshipType isEditable />
              <Birthday values={values} setFieldValue={setFieldValue} />
              <Email isEditable />
              <Address isEditable />
              <Notes isEditable />
              <h3>Useful Links</h3>
              <label htmlFor="link_1">Link 1</label>
              <Field type="text" name="link_1" placeholder="Enter a url here" />
              <ErrorMessage name="link_1" component="div" />
              {/* TODO get this add new button working */}
              <button type="button">Add New Link</button>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        {success && <p>This person has been added to your contacts!</p>}
      </div>
    </div>
  );
}
