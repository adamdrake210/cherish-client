import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  useSnackbarState,
  useSnackbarDispatch,
} from '../context/snackbarContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Snackbars = () => {
  const { open, variant, message } = useSnackbarState();
  const snackbarsDispatch = useSnackbarDispatch();

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }

    snackbarsDispatch({ type: 'reset_snackbars' });
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert onClose={handleClose} severity={variant}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Snackbars;
