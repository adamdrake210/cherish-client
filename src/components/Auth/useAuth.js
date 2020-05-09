import { useState, useEffect } from 'react';
import router from 'next/router';
import { firebase } from '../../firebase/firebase';

export default function useAuth() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  return authUser;
}
