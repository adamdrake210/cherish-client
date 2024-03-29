import { useState, useEffect } from 'react';
import { auth } from '@/services/firebase/firebase';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setIsLoading(false);
        setUser(authUser);
      } else {
        setIsLoading(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading };
}
