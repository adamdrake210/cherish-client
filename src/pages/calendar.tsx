import React from 'react';
import Head from 'next/head';
import Calendar from '../containers/Calendar/Calendar';
import ProtectedRoute from '../HOC/ProtectedRoute';
import AppLayout from '@/containers/AppLayout';

function PageIndex() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Cherish | Calendar</title>
      </Head>
      <AppLayout>
        <Calendar />
      </AppLayout>
    </ProtectedRoute>
  );
}

export default PageIndex;
