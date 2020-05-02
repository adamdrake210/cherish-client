import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { updateRelationship } from '../../firebase/firebaseapi';
import FirstName from './Fields/FirstName';
import LastName from './Fields/LastName';
import Address from './Fields/Address';
import RelationshipType from './Fields/RelationshipType';
import Email from './Fields/Email';
import Birthday from './Fields/Birthday';
import Notes from './Fields/Notes';

export default function EditRelationshipForm({ id, relationship }) {
  const [isEditable, setIsEditable] = useState(false);

  const {
    firstName,
    lastName,
    email,
    address,
    birthday,
    relationshiptype,
    notes,
    peopleId,
  } = relationship;

  return (
    <div className="container">
      <p>
        {firstName} {lastName}:
      </p>
      <div>
        <Formik
          initialValues={{
            firstName,
            lastName,
            email,
            birthday: birthday.seconds * 1000,
            relationshiptype,
            address,
            notes,
            peopleId,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              updateRelationship(id, values)
                .then(() => {
                  console.log('Document updated');
                  setSubmitting(false);
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
              <RelationshipType isEditable={isEditable} />
              <FirstName isEditable={isEditable} />
              <LastName isEditable={isEditable} />
              <Birthday
                isEditable={isEditable}
                values={values}
                setFieldValue={setFieldValue}
              />
              <Email isEditable={isEditable} />
              <Address isEditable={isEditable} />
              <Notes isEditable={isEditable} />
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
      </div>
    </div>
  );
}
