import React from 'react';
import Head from 'next/head';
import EditPerson from '@/containers/Person/EditPerson';
import ProtectedRoute from '@/HOC/ProtectedRoute';
import AppLayout from '@/containers/AppLayout';

function EditPersonPage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Cherish | Edit Person</title>
      </Head>
      <AppLayout>
        <EditPerson />
      </AppLayout>
    </ProtectedRoute>
  );
}

export default EditPersonPage;
