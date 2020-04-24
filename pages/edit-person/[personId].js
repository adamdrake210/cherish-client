import React from 'react';
import Head from 'next/head';
import EditPerson from '../../containers/Person/EditPerson';

function PageIndex() {
  return (
    <>
      <Head>
        <title>Cherish | Edit Person</title>
      </Head>

      <EditPerson />
    </>
  );
}

export default PageIndex;
