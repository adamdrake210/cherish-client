import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { firebase } from '../../firebase/firebase';
import Email from './Fields/Email';

export default function ResetPasswordForm() {
  const [firebaseError, setFirebaseError] = useState(null);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function resetPassword(email) {
    setLoading(true);
    return firebase.auth().sendPasswordResetEmail(email);
  }
  return (
    <div className="container">
      <div>
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
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
              alert(JSON.stringify(values, null, 2));
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="formContainer">
              <Email isEditable />

              <button type="submit" disabled={isSubmitting}>
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
        {loading && <p>Loading...</p>}
        {isPasswordReset && <p>Check Email to reset password.</p>}
        {firebaseError && <p>{firebaseError}</p>}
      </div>
    </div>
  );
}
