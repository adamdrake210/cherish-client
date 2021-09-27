import React from 'react';
import Head from 'next/head';
import AddPerson from '../containers/Person/AddPerson';
import ProtectedRoute from '../HOC/ProtectedRoute';

function PageIndex() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Cherish | Add Person</title>
      </Head>

      <AddPerson />
    </ProtectedRoute>
  );
}

export default PageIndex;
