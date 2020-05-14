import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useUserContext } from '../context/userContext';

function ProtectedRoute({ children }) {
  const { user } = useUserContext();
  if (user) return children;
  return (
    <div className="container">
      <div className="loading">
        <CircularProgress color="secondary" />
        <p>Loading...</p>
      </div>
    </div>
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
