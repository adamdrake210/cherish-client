import React from 'react';

export default function RelationshipDetails({ relationship, id }) {
  const {
    firstName,
    lastName,
    email,
    address,
    birthday,
    relationshiptype,
    comments,
    peopleId,
  } = relationship;

  return (
    <div>
      <p>
        {relationshiptype} - {firstName} {lastName}
      </p>
    </div>
  );
}
