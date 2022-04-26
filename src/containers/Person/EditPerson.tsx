import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AddRelationshipForm from '../../components/Forms/AddRelationshipForm';
import EditRelationshipForm from '../../components/Forms/EditRelationshipForm';
import { getRelationships } from '../../services/firebase/firebaseapi';
import { PersonType } from '../../types/types';
import { Button } from '@mui/material';
import { ROUTE } from '@/routes/routeConstants';
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
    <div className="container">
      <div>
        <h1>Edit Person - {person.firstName}</h1>
        <Link passHref href={ROUTE.VIEW_PERSON_DETAIL} as={`/person/${id}`}>
          <a>View Person Details</a>
        </Link>
        <PersonForm id={id} person={person} />
      </div>

      <h2>Current Relationships</h2>
      {isLoading && <p>Loading...</p>}

      {!isLoading && relationships.length < 1 && (
        <p>Currently there are no relationships for this person.</p>
      )}
      {!isLoading &&
        relationships.length > 0 &&
        relationships.map(relationship => (
          <EditRelationshipForm
            relationship={relationship}
            id={relationship.id}
            key={relationship.id}
          />
        ))}

      <div>
        {isAddRelationship && (
          <>
            <h2>Add Relationship</h2>
            {isAddRelationship && (
              <button
                type="button"
                className="button button-sm button-white"
                onClick={() => setIsAddRelationship(!isAddRelationship)}
              >
                Cancel
              </button>
            )}
            <AddRelationshipForm
              personId={id}
              setIsAddRelationship={setIsAddRelationship}
            />
          </>
        )}

        {!isAddRelationship && (
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={() => setIsAddRelationship(!isAddRelationship)}
          >
            Add Relationship
          </Button>
        )}
      </div>
    </div>
  );
}
