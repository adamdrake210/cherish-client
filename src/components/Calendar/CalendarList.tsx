import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPeople, getRelationships } from '@/services/firebase/firebaseapi';
import { useUserContext } from '@/context/userContext';
import { formatDate, sortBirthdays } from '@/helpers/dateHelpers';
import { monthsArray } from '@/constants';
import AgeDetails from '@/components/Common/Details/AgeDetails';
import Fabutton from '@/components/Common/Buttons/Fabutton';
import { ROUTE } from '@/routes/routeConstants';

export default function CalendarList() {
  const [peopleList, setPeopleList] = useState([]);
  const [relationshipsList, setRelationshipsList] = useState([]);
  const [, setCurrentMonth] = useState(0);
  const { user } = useUserContext();

  function handlePeopleSnapshot(snapshot) {
    const peopleArray = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setPeopleList(peopleArray);
  }

  function handleRelationshipsSnapshot(snapshot) {
    const relationshipArray = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setRelationshipsList(relationshipArray);
  }

  function convertBirthdaysToSortedList(array, month) {
    const birthdayArray = [];

    array.map(arr => {
      if (arr.birthmonth === month) {
        birthdayArray.push(arr);
      }
    });
    return sortBirthdays(birthdayArray);
  }

  function makeBirthdayList(month) {
    return (
      <div key={month}>
        <h2>{month}</h2>
        <ul className="calendar-birthday-list">
          {convertBirthdaysToSortedList(
            [...peopleList, ...relationshipsList],
            month,
          ).map(person => (
            <li key={person.id}>
              <a className="person-link">
                <div className="person-details">
                  <p>
                    {`${person.birthday} ${person.birthmonth} - `}
                    <Link
                      passHref
                      href={ROUTE.VIEW_PERSON_DETAIL}
                      as={`/person/${
                        person.peopleId ? person.peopleId : person.id
                      }`}
                    >
                      <a>{`${person.firstName} ${person.lastName}`}</a>
                    </Link>{' '}
                    -{' '}
                    <AgeDetails
                      birthday={person.birthday}
                      birthmonth={person.birthmonth}
                      birthyear={person.birthyear}
                    />
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  useEffect(() => {
    getPeople(user.uid, handlePeopleSnapshot);
    getRelationships(user.uid, 'userId', handleRelationshipsSnapshot);
    setCurrentMonth(new Date().getMonth());
  }, []);

  return (
    <div>
      <p>
        Today is <strong>{formatDate()}</strong>
      </p>

      {peopleList && relationshipsList && (
        <>
          {monthsArray.map(month => {
            return makeBirthdayList(month);
          })}
        </>
      )}
      <Fabutton />
    </div>
  );
}
