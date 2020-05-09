import React from 'react';
import PropTypes from 'prop-types';
import { useUserContext } from '../context/userContext';

function ProtectedRoute({ children }) {
  const { user } = useUserContext();
  if (user) return children;
  return (
    <div className="container">
      <p>Loading...</p>
    </div>
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
