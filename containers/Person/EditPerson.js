import React, { useState } from 'react';
import EditPersonForm from '../../components/Forms/EditPersonForm';
import AddRelationshipForm from '../../components/Forms/AddRelationshipForm';

export default function AddPerson({ person }) {
  const [success, setSuccess] = useState(false);
  const [personId, setPersonId] = useState('');

  return (
    <div className="container">
      <div>
        <h1>Edit Person - {person.firstName}</h1>
        <EditPersonForm
          person={person}
          success={success}
          setSuccess={setSuccess}
          setPersonId={setPersonId}
        />
      </div>
      <div>
        <h2>Add Relationship</h2>
        <AddRelationshipForm personId={personId} />
      </div>
    </div>
  );
}
