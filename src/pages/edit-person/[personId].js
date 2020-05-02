import React from 'react';
import Head from 'next/head';
import EditPerson from '../../containers/Person/EditPerson';
import { getPerson } from '../../firebase/firebaseapi';
import ProtectedRoute from '../../HOC/ProtectedRoute';

function EditPersonPage({ id, person }) {
  return (
    <ProtectedRoute>
      <Head>
        <title>Cherish | Edit Person</title>
      </Head>

      <EditPerson person={person} id={id} />
    </ProtectedRoute>
  );
}

EditPersonPage.getInitialProps = async ({ query }) => {
  let pageProps;

  await getPerson(query.personId)
    .then(person => {
      pageProps = {
        id: person.id,
        person: person.data(),
      };
    })
    .catch(error => {
      console.log('Edit Page: ', error);
    });

  return pageProps;
};

export default EditPersonPage;
