import React from 'react';
import Head from 'next/head';
import Homepage from '../containers/Homepage/Homepage';
import Nav from '../components/Navigation/Nav';

function PageIndex() {
  return (
    <>
      <Head>
        <title>Cherish | Home</title>
      </Head>
      <Nav />
      <Homepage />
    </>
  );
}

export default PageIndex;
