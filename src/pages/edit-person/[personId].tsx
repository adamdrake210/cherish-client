import React from 'react';
import Head from 'next/head';
import EditPerson from '@/containers/Person/EditPerson';
import { getPerson } from '@/services/firebase/firebaseapi';
import ProtectedRoute from '@/HOC/ProtectedRoute';
import { PersonType } from '@/types/types';
import AppLayout from '@/containers/AppLayout';

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
      <AppLayout>
        <EditPerson person={person} id={id} />
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

export default EditPersonPage;
