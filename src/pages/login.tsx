import React from 'react';
import Head from 'next/head';
import Login from '../components/Auth/Login';

function LoginPage() {
  return (
    <>
      <Head>
        <title>Cherish | Login</title>
      </Head>

      <Login />
    </>
  );
}

export default LoginPage;
