import React from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import { getPerson } from '@/services/firebase/firebaseapi';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';

import { ROUTE } from '@/routes/routeConstants';
import PersonForm from '@/components/Forms/PersonForm';
import Loading from '@/components/Common/Loaders/Loading';
import { PersonType } from '@/types/types';
import ViewRelationship from './ViewRelationship';
import { RQ_KEY_PERSON } from '@/constants/constants';

export default function EditPerson() {
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
      {person && (
        <Box>
          <Typography component="h1" variant="h3">
            Edit Person - {person.data().firstName}
          </Typography>
          <Link
            passHref
            href={ROUTE.VIEW_PERSON_DETAIL}
            as={`/person/${personId}`}
          >
            <Button sx={{ my: 2 }} color="secondary" variant="contained">
              View Person Details
            </Button>
          </Link>
          <Box sx={{ my: 2 }}>
            <PersonForm id={personId} person={person.data() as PersonType} />
          </Box>
        </Box>
      )}

      <ViewRelationship personId={personId} isEditing />
    </Loading>
  );
}
