import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRelationships } from '@/services/firebase/firebaseapi';
import { PersonType } from '@/types/types';
import { Box, Button, Typography } from '@mui/material';
import { ROUTE } from '@/routes/routeConstants';

import RelationshipForm from '@/components/Forms/RelationshipForm';
import PersonForm from '@/components/Forms/PersonForm';

type Props = {
  id: string;
  person: PersonType;
};

export default function EditPerson({ id, person }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddRelationship, setIsAddRelationship] = useState(false);
  const [relationships, setRelationships] = useState([]);

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
    <Box>
      <Box>
        <Typography component="h1" variant="h3">
          Edit Person - {person.firstName}
        </Typography>
        <Link passHref href={ROUTE.VIEW_PERSON_DETAIL} as={`/person/${id}`}>
          <Button sx={{ my: 2 }} color="secondary" variant="contained">
            View Person Details
          </Button>
        </Link>
        <Box sx={{ my: 2 }}>
          <PersonForm id={id} person={person} />
        </Box>
      </Box>

      <Typography component="h2" variant="h4">
        Current Relationships
      </Typography>
      {isLoading && <p>Loading...</p>}

      {!isLoading && relationships.length < 1 && (
        <Typography component="p" variant="body2">
          Currently there are no relationships for this person.
        </Typography>
      )}
      {!isLoading &&
        relationships.length > 0 &&
        relationships.map(relationship => (
          <RelationshipForm
            relation={relationship}
            id={relationship.id}
            key={relationship.id}
          />
        ))}

      <Box>
        {isAddRelationship && (
          <>
            <Typography component="h2" variant="h4">
              Add Relationships
            </Typography>
            {isAddRelationship && (
              <Button
                variant="outlined"
                color="info"
                sx={{ my: 2 }}
                onClick={() => setIsAddRelationship(!isAddRelationship)}
              >
                Cancel
              </Button>
            )}
            <RelationshipForm id={id} />
          </>
        )}

        {!isAddRelationship && (
          <Button
            type="button"
            color="secondary"
            variant="contained"
            sx={{ my: 2 }}
            onClick={() => setIsAddRelationship(!isAddRelationship)}
          >
            Add Relationship
          </Button>
        )}
      </Box>
    </Box>
  );
}
