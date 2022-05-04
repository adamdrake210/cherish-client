import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useQuery } from 'react-query';

import RelationshipDetails from '@/components/Common/Details/RelationshipDetails';
import { getRelationships } from '@/services/firebase/firebaseapi';
import Loading from '@/components/Common/Loaders/Loading';
import { Relation } from '@/types/types';
import RelationshipForm from '@/components/Forms/RelationshipForm';
import { RQ_KEY_RELATIONSHIP } from '@/constants/constants';

type ViewRelationshipProps = {
  personId: string;
  isEditing?: boolean;
};

export default function ViewRelationship({
  personId,
  isEditing,
}: ViewRelationshipProps) {
  const [isAddRelationship, setIsAddRelationship] = useState(false);

  const {
    data: relationships,
    isLoading,
    error,
    isError,
  } = useQuery([RQ_KEY_RELATIONSHIP, personId], () =>
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

      {isEditing ? (
        <>
          {relationships?.docs.length > 0 &&
            relationships?.docs.map(relationship => (
              <RelationshipForm
                relation={relationship.data() as Relation}
                id={relationship.id}
                key={relationship.id}
              />
            ))}

          <Box>
            {isAddRelationship && (
              <>
                <Typography component="h3" variant="h5">
                  Add Relationship
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
                <RelationshipForm id={personId} />
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
        </>
      ) : (
        <>
          {relationships?.docs.length > 0 &&
            relationships?.docs.map(relationship => (
              <RelationshipDetails
                key={relationship.id}
                relationship={relationship.data() as Relation}
              />
            ))}
        </>
      )}
    </Loading>
  );
}
