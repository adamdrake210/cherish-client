import React from 'react';
import getIntlDateTimeString from '../../helpers/dateHelpers';

export default function PersonDetails({ person }) {
  const {
    firstName,
    lastName,
    email,
    address,
    birthday,
    relationshiptype,
    notes,
    links,
  } = person;

  return (
    <div>
      <h2>
        {firstName} {lastName}
      </h2>
      <ul>
        <li>
          Birthday:{' '}
          {birthday
            ? getIntlDateTimeString(birthday.seconds * 1000)
            : 'No birthday set'}
        </li>
        <li>Notes: {notes || 'No comments at this time.'}</li>
        <li>
          Relationship: {relationshiptype || 'Relationship needs updating'}
        </li>
        <li>
          Email:{' '}
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
            {email}
          </a>
        </li>
        <li>Address: {address || 'No address at this time'}</li>
        <li>
          {links.length > 0 ? (
            <>
              <span>Useful Links:</span>
              <ul>
                {links.map(link => (
                  <li key={link}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            'No links at this time.'
          )}
        </li>
      </ul>
    </div>
  );
}
