import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updatePerson } from '../../firebase/firebaseapi';
import relationshipTypeArray from '../../constants';
import DatePickerField from './Fields/DatePickerField';

// TODO Do this.
export default function EditPersonForm({ id, person, success, setSuccess }) {
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
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              updatePerson(id, values)
                .then(docRef => {
                  console.log('Document written with ID: ', docRef);
                  setSubmitting(false);
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
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="firstName" required />
              <ErrorMessage name="firstName" component="div" />
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" required />
              <ErrorMessage name="lastName" component="div" />
              <label htmlFor="relationshiptype">Relationship</label>
              <Field as="select" name="relationshiptype" required>
                {relationshipTypeArray.map(relationship => (
                  <option key={relationship} value={relationship}>
                    {relationship}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="relationshiptype" component="div" />
              <label htmlFor="birthday">Birthday</label>
              <DatePickerField
                name="birthday"
                value={values.birthday}
                onChange={setFieldValue}
              />
              <ErrorMessage name="birthday" component="div" />
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
              <label htmlFor="address">Address</label>
              <Field type="textarea" name="address" placeholder="Address" />
              <ErrorMessage name="address" component="div" />
              <h3>Useful Links</h3>
              <label htmlFor="link_1">Link 1</label>
              <Field type="text" name="link_1" placeholder="Enter a url here" />
              <ErrorMessage name="link_1" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        {success && <p>{person.firstName}'s details have been updated.</p>}
      </div>
    </div>
  );
}
