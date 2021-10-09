import React from 'react';
import Head from 'next/head';
import Login from '@/components/Login/Login';
import AppLayout from '@/containers/AppLayout';

function LoginPage() {
  return (
    <>
      <Head>
        <title>Cherish | Login</title>
      </Head>
      <AppLayout>
        <Login />
      </AppLayout>
    </>
  );
}

export default LoginPage;
