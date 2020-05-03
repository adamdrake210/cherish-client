import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import EditPersonForm from '../../components/Forms/EditPersonForm';
import AddRelationshipForm from '../../components/Forms/AddRelationshipForm';
import EditRelationshipForm from '../../components/Forms/EditRelationshipForm';
import { getRelationships } from '../../firebase/firebaseapi';

export default function EditPerson({ id, person }) {
  const [success, setSuccess] = useState(false);
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
    getRelationships(id, handleSnapshot);
  }, []);

  return (
    <div className="container">
      <div>
        <h1>Edit Person - {person.firstName}</h1>
        <Link passHref href={`/person/${id}`}>
          <a>View Person Details</a>
        </Link>
        <EditPersonForm
          id={id}
          person={person}
          success={success}
          setSuccess={setSuccess}
        />
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
            <AddRelationshipForm personId={id} />
          </>
        )}

        {isAddRelationship && (
          <button
            type="button"
            onClick={() => setIsAddRelationship(!isAddRelationship)}
          >
            Cancel
          </button>
        )}

        {!isAddRelationship && (
          <button
            type="button"
            onClick={() => setIsAddRelationship(!isAddRelationship)}
          >
            Add Relationship
          </button>
        )}
      </div>
    </div>
  );
}
