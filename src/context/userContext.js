import React, { createContext, useContext } from 'react';
import useAuth from '../components/Auth/useAuth';

const UserContext = createContext(null);

function UserProvider({ children }) {
  const { user, isLoading } = useAuth();

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };

export const useUserContext = () => useContext(UserContext);
