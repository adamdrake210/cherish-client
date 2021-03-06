import React from 'react';
import { capitalizeFirstLetter } from '../../helpers/helpers';
import BirthdayDetails from './BirthdayDetails';

export default function RelationshipDetails({ relationship }) {
  const {
    firstName,
    lastName,
    birthday,
    birthmonth,
    birthyear,
    relationshiptype,
  } = relationship;

  return (
    <div className="details-list">
      <p>
        <strong>{capitalizeFirstLetter(relationshiptype)}</strong> - {firstName}{' '}
        {lastName}
      </p>
      <span className="details-birthday">
        <strong>Birthday:</strong>{' '}
        <BirthdayDetails
          birthday={birthday}
          birthmonth={birthmonth}
          birthyear={birthyear}
        />
      </span>
    </div>
  );
}
