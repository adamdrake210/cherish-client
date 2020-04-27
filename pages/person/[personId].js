import React from 'react';
import Head from 'next/head';
import Person from '../../containers/Person/Person';
import { getPerson } from '../../firebase/firebaseapi';

function PersonPage({ id, person }) {
  return (
    <>
      <Head>
        <title>Cherish | Person Details</title>
      </Head>

      <Person person={person} id={id} />
    </>
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
