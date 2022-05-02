import React from 'react';
import { Typography } from '@mui/material';
import { useQuery } from 'react-query';

import RelationshipDetails from '@/components/Common/Details/RelationshipDetails';
import { getRelationships } from '@/services/firebase/firebaseapi';
import Loading from '@/components/Common/Loaders/Loading';
import { Relation } from '@/types/types';

type ViewRelationshipProps = {
  personId: string;
};

export default function ViewRelationship({ personId }: ViewRelationshipProps) {
  const {
    data: relationships,
    isLoading,
    error,
    isError,
  } = useQuery(['relationship', personId], () =>
    getRelationships(personId, 'peopleId'),
  );

  return (
    <Loading error={error as Error} isError={isError} isLoading={isLoading}>
      <Typography variant="h4" component="h2">
        Relationships
      </Typography>

      {relationships?.docs.length === 0 && (
        <Typography component="p">
          Currently there are no relationships for this person.
        </Typography>
      )}

      {relationships?.docs.length > 0 &&
        relationships?.docs.map(relationship => (
          <RelationshipDetails
            key={relationship.id}
            relationship={relationship.data() as Relation}
          />
        ))}
    </Loading>
  );
}
