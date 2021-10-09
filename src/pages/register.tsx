import React from 'react';
import Head from 'next/head';
import Register from '@/components/Register/Register';
import AppLayout from '@/containers/AppLayout';

function RegisterPage() {
  return (
    <>
      <Head>
        <title>Cherish | Register</title>
      </Head>
      <AppLayout>
        <Register />
      </AppLayout>
    </>
  );
}

export default RegisterPage;
