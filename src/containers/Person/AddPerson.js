import React, { useState } from 'react';
import AddPersonForm from '../../components/Forms/AddPersonForm';
import AddRelationshipForm from '../../components/Forms/AddRelationshipForm';

export default function AddPerson() {
  const [success, setSuccess] = useState(false);
  const [personId, setPersonId] = useState('');

  return (
    <div className="container">
      <div>
        <h1>Add Person</h1>
        <AddPersonForm
          success={success}
          setSuccess={setSuccess}
          setPersonId={setPersonId}
        />
      </div>
      {success && (
        <div>
          <AddRelationshipForm personId={personId} />
        </div>
      )}
    </div>
  );
}
