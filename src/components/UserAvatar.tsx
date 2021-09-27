import React from 'react';
import { getFirstLetter } from '../helpers/helpers';

type Props = {
  displayName: string;
};

export default function UserAvatar({ displayName }: Props) {
  return <div className="firstLetter">{getFirstLetter(displayName)}</div>;
}
