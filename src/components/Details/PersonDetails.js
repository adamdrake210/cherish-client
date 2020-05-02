import React from 'react';

export default function PersonDetails({ person, id }) {
  const {
    firstName,
    lastName,
    email,
    address,
    birthday,
    relationshiptype,
    comments,
    links,
    peopleId,
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
        <li>Comments: {comments || 'No comments at this time.'}</li>
        <li>
          Useful Links:{' '}
          {links ? (
            <ul>
              {links.map(link => (
                <li>{link}</li>
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
