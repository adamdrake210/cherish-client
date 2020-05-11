import React from 'react';
import Head from 'next/head';
import Calendar from '../containers/Calendar/Calendar';
import ProtectedRoute from '../HOC/ProtectedRoute';

function PageIndex() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Cherish | Calendar</title>
      </Head>

      <Calendar />
    </ProtectedRoute>
  );
}

export default PageIndex;
