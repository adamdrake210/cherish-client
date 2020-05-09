import React from 'react';
import { getAge } from '../../helpers/dateHelpers';

export default function AgeDetails({ birthday, birthmonth, birthyear }) {
  return <>Currently {getAge(birthday, birthmonth, birthyear)}</>;
}
