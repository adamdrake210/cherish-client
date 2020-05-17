import React from 'react';
import BirthdayDetails from './BirthdayDetails';
import { capitalizeFirstLetter } from '../../helpers/helpers';

export default function PersonDetails({ person }) {
  const {
    firstName,
    lastName,
    email,
    address,
    birthday,
    birthmonth,
    birthyear,
    relationshiptype,
    notes,
    links,
  } = person;

  return (
    <div className="details-list">
      <h2>
        {firstName} {lastName}
      </h2>
      <ul>
        <li>
          <strong>Birthday:</strong>{' '}
          <BirthdayDetails
            birthday={birthday}
            birthmonth={birthmonth}
            birthyear={birthyear}
          />
        </li>
        <li>
          <strong>Notes:</strong> {notes || 'No comments at this time.'}
        </li>
        <li>
          <strong>Relationship:</strong>{' '}
          {capitalizeFirstLetter(relationshiptype) ||
            'Relationship needs updating'}
        </li>
        <li>
          <strong>Email:</strong>{' '}
          {email ? (
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {email}
            </a>
          ) : (
            'No email set at this time. '
          )}
        </li>
        <li>
          <strong>Address:</strong> {address || 'No address at this time'}
        </li>
        <li>
          {links.length > 0 && links[0] !== '' ? (
            <>
              <span>
                <strong>Useful Links:</strong>
              </span>
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
