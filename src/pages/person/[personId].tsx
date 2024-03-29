import React from 'react';
import Head from 'next/head';
import ViewPerson from '@/containers/Person/ViewPerson';
import ProtectedRoute from '@/HOC/ProtectedRoute';
import AppLayout from '@/containers/AppLayout';
import Fabutton from '@/components/Common/Buttons/Fabutton';

function PersonPage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Cherish | Person Details</title>
      </Head>
      <AppLayout>
        <ViewPerson />
        <Fabutton />
      </AppLayout>
    </ProtectedRoute>
  );
}

export default PersonPage;
