import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Typography, Button } from '@mui/material';

import PersonDetails from '@/components/Common/Details/PersonDetails';
import RelationshipDetails from '@/components/Common/Details/RelationshipDetails';
import { getRelationships } from '@/services/firebase/firebaseapi';
import Fabutton from '@/components/Common/Buttons/Fabutton';
import { PersonType } from '@/types/types';
import Loader from '@/components/Common/Loaders/Loader';
import { ROUTE } from '@/routes/routeConstants';

type Props = {
  person: PersonType;
  id: string;
};

export default function ViewPerson({ person, id }: Props) {
  const [relationships, setRelationships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleSnapshot(snapshot) {
    const relationshipsArray = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setRelationships(relationshipsArray);
    setIsLoading(false);
  }

  useEffect(() => {
    getRelationships(id, 'peopleId', handleSnapshot);
  }, []);

  return (
    <div>
      <Typography variant="h3" component="h1">
        Details
      </Typography>
      <Link passHref href={ROUTE.EDIT_PERSON_DETAIL} as={`/edit-person/${id}`}>
        <Button sx={{ my: 2 }} color="secondary" variant="contained">
          Edit Person
        </Button>
      </Link>
      <PersonDetails person={person} />

      <Typography variant="h4" component="h2">
        Relationships
      </Typography>
      {isLoading && <Loader />}

      {!isLoading && relationships.length === 0 && (
        <Typography component="p">
          Currently there are no relationships for this person.
        </Typography>
      )}

      {!isLoading &&
        relationships.length > 0 &&
        relationships.map(relationship => (
          <RelationshipDetails
            key={relationship.id}
            relationship={relationship}
          />
        ))}
      <Fabutton />
    </div>
  );
}
