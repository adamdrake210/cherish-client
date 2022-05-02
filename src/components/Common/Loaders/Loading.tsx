import React from 'react';
import { Box, CircularProgress, Theme, Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles<Theme>(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginBottom: theme.spacing(2),
  },
}));

type Props = {
  error?: Error | null;
  isLoading?: boolean;
  isError?: boolean;
  children?: any;
  loadingMessage?: string;
};

const Loading = ({
  isLoading,
  loadingMessage,
  isError,
  error,
  children = null,
}: Props) => {
  const classes = useStyles();

  if (isLoading) {
    return (
      <Box className={classes.container}>
        <CircularProgress
          size={25}
          color="primary"
          className={classes.loader}
        />
        <Typography variant="body2" color="primary">
          {loadingMessage || 'Loading...'}
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className={classes.container}>
        <Typography variant="body2" color="error">
          There was a problem loading this request - {error && error.message}
        </Typography>
      </Box>
    );
  }

  return children;
};

export default Loading;
