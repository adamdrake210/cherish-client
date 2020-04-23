import React from 'react';
import Head from 'next/head';
import Homepage from '../containers/Homepage/Homepage';

function PageIndex() {
  return (
    <>
      <Head>
        <title>Cherish</title>
      </Head>

      <Homepage />
    </>
  );
}

export default PageIndex;
