import React from 'react';
import Head from 'next/head';
import Person from '@/containers/Person/Person';
import { getPerson } from '@/services/firebase/firebaseapi';
import ProtectedRoute from '@/HOC/ProtectedRoute';
import { PersonType } from '@/types/types';
import AppLayout from '@/containers/AppLayout';

type Props = {
  id: string;
  person: PersonType;
};

function PersonPage({ id, person }: Props) {
  return (
    <ProtectedRoute>
      <Head>
        <title>Cherish | Person Details</title>
      </Head>
      <AppLayout>
        <Person person={person} id={id} />
      </AppLayout>
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
      console.error('Person Page: ', error);
    });

  return { props: pageProps };
}

export default PersonPage;
