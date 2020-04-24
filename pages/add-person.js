import React from 'react';
import Head from 'next/head';
import AddPerson from '../containers/Person/AddPerson';

function PageIndex() {
  return (
    <>
      <Head>
        <title>Cherish | Add Person</title>
      </Head>

      <AddPerson />
    </>
  );
}

export default PageIndex;
