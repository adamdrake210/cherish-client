import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PersonDetails from '../../components/Details/PersonDetails';
import RelationshipDetails from '../../components/Details/RelationshipDetails';
import { getRelationships } from '../../firebase/firebaseapi';
import Fabutton from '../../components/Fabutton';

export default function Person({ person, id }) {
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
    <div className="container details-container">
      <h1>Details</h1>
      <Link passHref href="/edit-person/[personId]" as={`/edit-person/${id}`}>
        <a>Edit Person</a>
      </Link>
      <PersonDetails person={person} id={id} />

      <h2>Relationships</h2>
      {isLoading && <p>Loading...</p>}

      {!isLoading && relationships.length === 0 && (
        <p>Currently there are no relationships for this person.</p>
      )}

      {!isLoading &&
        relationships.length > 0 &&
        relationships.map(relationship => (
          <RelationshipDetails
            key={relationship.id}
            relationship={relationship}
            id={relationship.id}
          />
        ))}
      <Fabutton />
    </div>
  );
}
