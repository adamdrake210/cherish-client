import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updatePerson } from '../../firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipType from './Fields/RelationshipType';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';
import Notes from './Fields/Notes';

export default function EditPersonForm({ id, person, success, setSuccess }) {
  const [isEditable, setIsEditable] = useState(false);

  const {
    firstName,
    lastName,
    email,
    address,
    birthday,
    relationshiptype,
    notes,
  } = person;

  return (
    <div className="container">
      <div>
        <Formik
          initialValues={{
            firstName,
            lastName,
            relationshiptype,
            birthday: birthday ? birthday.seconds * 1000 : '',
            email,
            address,
            notes,
            link_1: person.link_1,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              updatePerson(id, values)
                .then(docRef => {
                  console.log('Document written with ID: ', docRef);
                  setSubmitting(false);
                  setSuccess(true);
                  setIsEditable(false);
                })
                .catch(error => {
                  console.error('Error adding document: ', error);
                  setSubmitting(false);
                });
            }, 400);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="formContainer">
              <FirstName isEditable={isEditable} />
              <LastName isEditable={isEditable} />
              <RelationshipType isEditable={isEditable} />
              <Birthday
                values={values}
                setFieldValue={setFieldValue}
                isEditable={isEditable}
              />
              <Email isEditable={isEditable} />
              <Address isEditable={isEditable} />
              <Notes isEditable={isEditable} />
              {/* // TODO Do this. */}
              <h3>Useful Links</h3>
              <label htmlFor="link_1">Link 1</label>
              <Field type="text" name="link_1" placeholder="Enter a url here" />
              <ErrorMessage name="link_1" component="div" />

              {isEditable && (
                <button type="submit" disabled={isSubmitting}>
                  Update
                </button>
              )}
            </Form>
          )}
        </Formik>
        {!isEditable && (
          <button
            type="button"
            onClick={() => setIsEditable(prevIsEditable => !prevIsEditable)}
          >
            Edit
          </button>
        )}
        {success && <p>{person.firstName}'s details have been updated.</p>}
      </div>
    </div>
  );
}
