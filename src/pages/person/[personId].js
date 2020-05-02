import React from 'react';
import Head from 'next/head';
import Person from '../../containers/Person/Person';
import { getPerson } from '../../firebase/firebaseapi';
import ProtectedRoute from '../../HOC/ProtectedRoute';

function PersonPage({ id, person }) {
  return (
    <ProtectedRoute>
      <Head>
        <title>Cherish | Person Details</title>
      </Head>

      <Person person={person} id={id} />
    </ProtectedRoute>
  );
}

PersonPage.getInitialProps = async ({ query }) => {
  let pageProps;

  await getPerson(query.personId)
    .then(person => {
      pageProps = {
        id: person.id,
        person: person.data(),
      };
    })
    .catch(error => {
      console.log('Person Page: ', error);
    });

  return pageProps;
};

export default PersonPage;
