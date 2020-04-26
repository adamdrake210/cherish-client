import React, { useState } from 'react';
import EditPersonForm from '../../components/Forms/EditPersonForm';
import AddRelationshipForm from '../../components/Forms/AddRelationshipForm';

export default function EditPerson({ id, person }) {
  const [success, setSuccess] = useState(false);

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
      <div>
        <h2>Add Relationship</h2>
        <AddRelationshipForm personId={id} />
      </div>
    </div>
  );
}
