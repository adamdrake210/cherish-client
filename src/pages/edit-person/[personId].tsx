import React from 'react';
import Head from 'next/head';
import EditPerson from '../../containers/Person/EditPerson';
import { getPerson } from '../../services/firebase/firebaseapi';
import ProtectedRoute from '../../HOC/ProtectedRoute';
import { PersonType } from '../../types/types';

type Props = {
  id: string;
  person: PersonType;
};

function EditPersonPage({ id, person }: Props) {
  return (
    <ProtectedRoute>
      <Head>
        <title>Cherish | Edit Person</title>
      </Head>

      <EditPerson person={person} id={id} />
    </ProtectedRoute>
  );
}

export async function getServerSideProps({ query }) {
  let pageProps;

  await getPerson(query.personId)
    .then(person => {
      pageProps = {
        id: person.id,
        person: person.data(),
      };
    })
    .catch(error => {
      console.error('Edit Page: ', error);
    });

  return { props: pageProps };
}

export default EditPersonPage;
