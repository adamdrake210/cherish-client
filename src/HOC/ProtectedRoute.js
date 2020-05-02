import React from 'react';
import PropTypes from 'prop-types';
import { useUserContext } from '../context/userContext';

function ProtectedRoute({ children }) {
  const { user } = useUserContext();
  if (user) return children;
  return <p>please log in</p>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
