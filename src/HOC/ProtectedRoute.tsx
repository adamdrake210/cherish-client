import React from 'react';
import Loader from '../components/Common/Loaders/Loader';
import { useUserContext } from '../context/userContext';

type Props = {
  children: any;
};

function ProtectedRoute({ children }: Props) {
  const { user } = useUserContext();
  if (user) return children;
  return <Loader />;
}

export default ProtectedRoute;
