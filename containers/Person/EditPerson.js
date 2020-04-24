import React, { useState } from 'react';
import EditPersonForm from '../../components/Forms/AddPersonForm';
import AddRelationshipForm from '../../components/Forms/AddRelationshipForm';

export default function AddPerson() {
  const [success, setSuccess] = useState(false);
  const [personId, setPersonId] = useState('');

  return (
    <div className="container">
      <div>
        <h1>Edit Person</h1>
        <EditPersonForm
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
