import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader() {
  return (
    <div className="container">
      <div className="loading">
        <CircularProgress color="secondary" />
        <p>Loading...</p>
      </div>
    </div>
  );
}
