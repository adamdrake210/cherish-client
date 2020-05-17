import React from 'react';
import { getAge } from '../../helpers/dateHelpers';

export default function BirthdayDetails({ birthday, birthmonth, birthyear }) {
  return (
    <>
      {!birthday || !birthmonth ? '' : `${birthday} ${birthmonth}`}
      {!birthyear ? '' : ` ${birthyear}. Currently - `}
      {getAge(birthday, birthmonth, birthyear)}
    </>
  );
}
