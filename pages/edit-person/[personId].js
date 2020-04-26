import React from 'react';
import Head from 'next/head';
import EditPerson from '../../containers/Person/EditPerson';
import { getPerson } from '../../firebase/firebaseapi';

function EditPersonPage({ person }) {
  return (
    <>
      <Head>
        <title>Cherish | Edit Person</title>
      </Head>

      <EditPerson person={person} />
    </>
  );
}

EditPersonPage.getInitialProps = async ({ query }) => {
  let pageProps;

  await getPerson(query.personId)
    .then(person => {
      pageProps = {
        person: person.data(),
      };
    })
    .catch(error => {
      console.log('Edit Page: ', error);
    });

  return pageProps;
};

export default EditPersonPage;
