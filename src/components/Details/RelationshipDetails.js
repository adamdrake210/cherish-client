import React from 'react';
import { capitalizeFirstLetter } from '../../helpers/helpers';

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
        {capitalizeFirstLetter(relationshiptype)} - {firstName} {lastName}
      </p>
    </div>
  );
}
