import React from 'react';
import Link from 'next/link';
import { Typography, Button } from '@mui/material';
import { useQuery } from 'react-query';

import PersonDetails from '@/components/Common/Details/PersonDetails';
import { getPerson } from '@/services/firebase/firebaseapi';
import { ROUTE } from '@/routes/routeConstants';
import { useRouter } from 'next/router';
import Loading from '@/components/Common/Loaders/Loading';
import { PersonType } from '@/types/types';
import ViewRelationship from './ViewRelationship';

export default function ViewPerson() {
  const router = useRouter();
  const personId = router.query.personId;

  const {
    data: person,
    isLoading,
    error,
    isError,
  } = useQuery(['person', personId], () => getPerson(personId));

  return (
    <Loading error={error as Error} isError={isError} isLoading={isLoading}>
      <Typography variant="h3" component="h1">
        Details
      </Typography>
      <Link
        passHref
        href={ROUTE.EDIT_PERSON_DETAIL}
        as={`/edit-person/${personId}`}
      >
        <Button sx={{ my: 2 }} color="secondary" variant="contained">
          Edit Person
        </Button>
      </Link>
      {person && <PersonDetails person={person.data() as PersonType} />}

      <ViewRelationship
        personId={typeof personId === 'string' ? personId : ''}
      />
    </Loading>
  );
}
