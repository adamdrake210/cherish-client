import React from 'react';
import Head from 'next/head';
import ResetPassword from '@/components/Auth/ResetPassword';
import AppLayout from '@/containers/AppLayout';

function RegisterPage() {
  return (
    <>
      <Head>
        <title>Cherish | Reset Password</title>
      </Head>
      <AppLayout>
        <ResetPassword />
      </AppLayout>
    </>
  );
}

export default RegisterPage;
