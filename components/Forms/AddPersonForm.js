import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePickerField from './Fields/DatePickerField';
import { addPerson } from '../../firebase/firebaseapi';

const relationshipTypeArray = [
  'mother',
  'father',
  'son',
  'daughter',
  'brother',
  'sister',
  'cousin',
  'Friend',
  'colleague',
];

export default function AddPersonForm({ success, setSuccess, setPersonId }) {
  const validateEmail = value => {
    let errorMessage;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errorMessage = 'Invalid email address';
    }
    return errorMessage;
  };

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
            userId: 'gbm98V9ySiU46PvoebGH',
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
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="firstName" required />
              <ErrorMessage name="firstName" component="div" />
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" required />
              <ErrorMessage name="lastName" component="div" />
              <label htmlFor="relationshiptype">Relationship</label>
              <Field as="select" name="relationshiptype" required>
                {relationshipTypeArray.map(relationship => (
                  <option value={relationship}>{relationship}</option>
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
              <Field
                type="email"
                name="email"
                placeholder="Email"
                validate={validateEmail}
              />
              <ErrorMessage name="email" component="div" />
              <label htmlFor="address">Address</label>
              <Field type="textarea" name="address" placeholder="Address" />
              <ErrorMessage name="address" component="div" />
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
