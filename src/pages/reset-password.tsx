import React from 'react';
import Head from 'next/head';
import ResetPassword from '../components/Auth/ResetPassword';

function RegisterPage() {
  return (
    <>
      <Head>
        <title>Cherish | Reset Password</title>
      </Head>

      <ResetPassword />
    </>
  );
}

export default RegisterPage;
