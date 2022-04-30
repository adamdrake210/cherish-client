import React from 'react';
import Head from 'next/head';
import ViewPerson from '@/containers/Person/ViewPerson';
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
        <ViewPerson person={person} id={id} />
      </AppLayout>
    </ProtectedRoute>
  );
}

export async function getServerSideProps({ query }) {
  const res = await getPerson(query.personId);
  const person = res.data();

  if (!person) {
    return {
      notFound: true,
    };
  }

  const pageProps = {
    id: res.id,
    person,
  };

  return { props: pageProps };
}

export default PersonPage;
