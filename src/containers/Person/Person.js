import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PersonDetails from '../../components/Details/PersonDetails';
import RelationshipDetails from '../../components/Details/RelationshipDetails';
import { getRelationships } from '../../firebase/firebaseapi';

export default function Person({ person, id }) {
  const [relationships, setRelationships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRelationships(id).then(querySnapshot => {
      setRelationships(querySnapshot.docs);
      setIsLoading(false);
      querySnapshot.docs.map(doc => {
        return console.log({ ...doc.data(), id: doc.id });
      });
    });
  }, []);

  return (
    <>
      <h1>Details</h1>
      <Link passHref href={`/edit-person/${id}`}>
        Edit Person
      </Link>
      <PersonDetails person={person} id={id} />

      <h2>Current Relationships</h2>
      {isLoading && <p>Loading...</p>}

      {!isLoading && relationships.length === 0 && (
        <p>Currently there are no relationships for this person.</p>
      )}

      {!isLoading &&
        relationships.length > 0 &&
        relationships.map(relationship => (
          <RelationshipDetails
            key={relationship.id}
            relationship={relationship.data()}
            id={relationship.id}
          />
        ))}
    </>
  );
}
