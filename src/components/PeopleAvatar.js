import React from 'react';
import { getFirstLetter } from '../helpers/helpers';

export default function PeopleAvatar({ firstName, lastName }) {
  return (
    <div className="people-avatar">
      {getFirstLetter(firstName)}
      {getFirstLetter(lastName)}
    </div>
  );
}
