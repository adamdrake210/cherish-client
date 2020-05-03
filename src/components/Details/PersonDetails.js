import React from 'react';

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
          Email: <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li>
          Birthday: {birthday ? birthday.seconds * 1000 : 'No birthday set'}
        </li>
        <li>
          Relationship: {relationshiptype || 'Relationship needs updating'}
        </li>
        <li>Address: {address || 'No address at this time'}</li>
        <li>Notes: {notes || 'No comments at this time.'}</li>
        <li>
          Useful Links:{' '}
          {links ? (
            <ul>
              {links.map(link => (
                <li>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            'No comments at this time.'
          )}
        </li>
      </ul>
    </div>
  );
}
