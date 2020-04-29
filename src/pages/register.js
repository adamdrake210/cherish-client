import React from 'react';
import Head from 'next/head';
import Register from '../components/Auth/Register';

function RegisterPage() {
  return (
    <>
      <Head>
        <title>Cherish | Register</title>
      </Head>

      <Register />
    </>
  );
}

export default RegisterPage;
