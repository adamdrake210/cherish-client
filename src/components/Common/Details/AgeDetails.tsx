import React from 'react';
import { getAge } from '@/helpers/dateHelpers';

type Props = {
  birthday: string;
  birthmonth: string;
  birthyear: string;
};

export default function AgeDetails({ birthday, birthmonth, birthyear }: Props) {
  return <>{getAge(birthday, birthmonth, birthyear)}</>;
}
