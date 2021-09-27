import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { firebase } from '../../services/firebase/firebase';
import Email from './Fields/Email';

export default function ResetPasswordForm() {
  const [firebaseError, setFirebaseError] = useState(null);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [loading, setLoading] = useState(false);

  function resetPassword(email) {
    setLoading(true);
    return firebase.auth().sendPasswordResetEmail(email);
  }
  return (
    <div className="login-container-form">
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          resetPassword(values.email)
            .then(response => {
              setLoading(false);
              setIsPasswordReset(true);
              setSubmitting(false);
              setFirebaseError(null);
              console.log(response);
            })
            .catch(error => {
              setLoading(false);
              setSubmitting(false);
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log('errorCode', errorCode);
              console.log('errorMessage', errorMessage);
              setFirebaseError(errorMessage);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="formContainer">
            <Email isEditable noLabel />

            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-lg button-blue m-t-5 m-b-20"
            >
              Reset Password
            </button>
          </Form>
        )}
      </Formik>
      {loading && <p>Loading...</p>}
      {isPasswordReset && <p>Check Email to reset password.</p>}
      {firebaseError && <p>{firebaseError}</p>}
    </div>
  );
}
