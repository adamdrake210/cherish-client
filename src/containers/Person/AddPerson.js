import React, { useState } from 'react';
import AddPersonForm from '../../components/Forms/AddPersonForm';
import AddRelationshipForm from '../../components/Forms/AddRelationshipForm';

export default function AddPerson() {
  const [success, setSuccess] = useState(false);
  const [personId, setPersonId] = useState('');

  return (
    <div>
      <div>
        <h1>Add Person</h1>
        <AddPersonForm
          className="container"
          success={success}
          setSuccess={setSuccess}
          setPersonId={setPersonId}
        />
      </div>
      {success && (
        <div>
          <AddRelationshipForm className="container" personId={personId} />
        </div>
      )}
    </div>
  );
}
