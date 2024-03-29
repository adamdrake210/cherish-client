import React from 'react';
import Link from 'next/link';
import { Typography, Button, Box } from '@mui/material';
import { useQuery } from 'react-query';

import PersonDetails from '@/components/Common/Details/PersonDetails';
import { getPerson } from '@/services/firebase/firebaseapi';
import { ROUTE } from '@/routes/routeConstants';
import { useRouter } from 'next/router';
import Loading from '@/components/Common/Loaders/Loading';
import { PersonType } from '@/types/types';
import ViewRelationship from './ViewRelationship';
import { RQ_KEY_PERSON } from '@/constants/constants';

export default function ViewPerson() {
  const router = useRouter();
  const personId = router.query.personId as string;

  const {
    data: person,
    isLoading,
    error,
    isError,
  } = useQuery([RQ_KEY_PERSON, personId], () => getPerson(personId));

  return (
    <Loading error={error as Error} isError={isError} isLoading={isLoading}>
      {person?.data() ? (
        <Box>
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
          <PersonDetails person={person.data() as PersonType} />

          <ViewRelationship personId={personId} />
        </Box>
      ) : (
        <Box sx={{ mx: 8, textAlign: 'center' }}>
          <Typography variant="h6" color="error.light">
            There was a problem finding this person. Please try again or check
            that this person exists.
          </Typography>
        </Box>
      )}
    </Loading>
  );
}
