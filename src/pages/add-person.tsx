import React from 'react';
import Head from 'next/head';
import AddPerson from '@/containers/Person/AddPerson';
import ProtectedRoute from '@/HOC/ProtectedRoute';
import AppLayout from '@/containers/AppLayout';

function PageIndex() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Cherish | Add Person</title>
      </Head>
      <AppLayout>
        <AddPerson />
      </AppLayout>
    </ProtectedRoute>
  );
}

export default PageIndex;
