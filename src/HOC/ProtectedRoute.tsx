import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../components/Loader';
import { useUserContext } from '../context/userContext';

type Props = {
  children: React.Component;
};

function ProtectedRoute({ children }: Props) {
  const { user } = useUserContext();
  if (user) return children;
  return <Loader />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
