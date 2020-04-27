import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updatePerson } from '../../firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipType from './Fields/RelationshipType';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';

export default function EditPersonForm({ id, person, success, setSuccess }) {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className="container">
      <div>
        <Formik
          initialValues={{
            firstName: person.firstName,
            lastName: person.lastName,
            relationshiptype: person.relationshiptype,
            birthday: person.birthday.seconds * 1000,
            email: person.email,
            address: person.address,
            link_1: person.link_1,
            userId: 'gbm98V9ySiU46PvoebGH',
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
              alert(JSON.stringify(values, null, 2));
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
          <button type="button" onClick={() => setIsEditable(!isEditable)}>
            Edit
          </button>
        )}
        {success && <p>{person.firstName}'s details have been updated.</p>}
      </div>
    </div>
  );
}
