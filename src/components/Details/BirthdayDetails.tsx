import React from 'react';
import { getAge } from '../../helpers/dateHelpers';

type Props = {
  birthday: string;
  birthmonth: string;
  birthyear: string;
};

export default function BirthdayDetails({
  birthday,
  birthmonth,
  birthyear,
}: Props) {
  return (
    <>
      {!birthday || !birthmonth ? '' : `${birthday} ${birthmonth} `}
      {!birthyear ? '' : `${birthyear}. Currently - `}
      {getAge(birthday, birthmonth, birthyear)}
    </>
  );
}
