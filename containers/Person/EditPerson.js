import React, { useState, useEffect } from 'react';
import EditPersonForm from '../../components/Forms/EditPersonForm';
import AddRelationshipForm from '../../components/Forms/AddRelationshipForm';
import EditRelationshipForm from '../../components/Forms/EditRelationshipForm';
import { getRelationships } from '../../firebase/firebaseapi';

export default function EditPerson({ id, person }) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [relationships, setRelationships] = useState([]);

  useEffect(() => {
    getRelationships(id).then(querySnapshot => {
      setRelationships(querySnapshot.docs);
      setLoading(false);
      querySnapshot.docs.map(doc => {
        console.log({ ...doc.data(), id: doc.id });
      });
    });
  }, []);

  return (
    <div className="container">
      <div>
        <h1>Edit Person - {person.firstName}</h1>
        <EditPersonForm
          id={id}
          person={person}
          success={success}
          setSuccess={setSuccess}
        />
      </div>

      <h2>Current Relationship</h2>
      {loading && <p>Loading...</p>}

      {!loading && relationships.length === 0 && (
        <p>Currently there are no relationships for this person.</p>
      )}
      {!loading &&
        relationships.length > 0 &&
        relationships.map(relationship => (
          <EditRelationshipForm
            key={relationship.data().peopleId}
            relationship={relationship.data()}
            id={relationship.id}
          />
        ))}

      <div>
        <h2>Add Relationship</h2>
        <AddRelationshipForm personId={id} />
      </div>
    </div>
  );
}
