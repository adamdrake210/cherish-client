import React from 'react';
import { getFirstLetter } from '../helpers/helpers';

export default function UserAvatar({ displayName }) {
  return <div className="firstLetter">{getFirstLetter(displayName)}</div>;
}
