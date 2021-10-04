import React from 'react';
import Head from 'next/head';
import Homepage from '../containers/Homepage/Homepage';
import AppLayout from '@/containers/AppLayout';

function PageIndex() {
  return (
    <>
      <Head>
        <title>Cherish | Home</title>
      </Head>
      <AppLayout>
        <Homepage />
      </AppLayout>
    </>
  );
}

export default PageIndex;
