import React from 'react';
import Head from 'next/head';
import ViewPerson from '@/containers/Person/ViewPerson';
import ProtectedRoute from '@/HOC/ProtectedRoute';
// import { PersonType } from '@/types/types';
import AppLayout from '@/containers/AppLayout';
import Fabutton from '@/components/Common/Buttons/Fabutton';

function PersonPage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Cherish | Person Details</title>
      </Head>
      <AppLayout>
        <ViewPerson />
        <Fabutton />
      </AppLayout>
    </ProtectedRoute>
  );
}

// export async function getServerSideProps({ query }) {
//   const res = await getPerson(query.personId);
//   const person = res.data();

//   if (!person) {
//     return {
//       notFound: true,
//     };
//   }

//   const pageProps = {
//     id: res.id,
//     person,
//   };

//   return { props: pageProps };
// }

export default PersonPage;
