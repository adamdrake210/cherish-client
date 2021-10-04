import React from 'react';
import { getFirstLetter } from '../../helpers/helpers';

type Props = {
  firstName: string;
  lastName: string;
};

export default function PeopleAvatar({ firstName, lastName }: Props) {
  return (
    <div className="people-avatar">
      {getFirstLetter(firstName)}
      {getFirstLetter(lastName)}
    </div>
  );
}
