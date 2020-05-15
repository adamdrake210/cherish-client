import React, { createContext, useReducer, useContext } from 'react';

const SnackbarStateContext = createContext();
const SnackbarDispatchContext = createContext();

export const initialSnackbars = {
  open: false,
  variant: '',
  message: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'show_snackbar': {
      return {
        open: true,
        variant: action.payload.variant,
        message: action.payload.message,
      };
    }

    case 'reset_snackbars': {
      return { ...initialSnackbars };
    }

    default: {
      throw new Error(
        `SnackbarsContext does not handle action type: ${action.type}`,
      );
    }
  }
}

function SnackbarProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialSnackbars);

  return (
    <SnackbarStateContext.Provider value={state}>
      <SnackbarDispatchContext.Provider value={dispatch}>
        {children}
      </SnackbarDispatchContext.Provider>
    </SnackbarStateContext.Provider>
  );
}

function useSnackbarState() {
  const context = useContext(SnackbarStateContext);
  if (context === undefined) {
    throw new Error('could not find a Provider for SnackbarsStateContext');
  }
  return context;
}

function useSnackbarDispatch() {
  const context = React.useContext(SnackbarDispatchContext);
  if (context === undefined) {
    throw new Error('could not find a Provider for SnackbarsDispatchContext');
  }
  return context;
}

export { SnackbarProvider, useSnackbarState, useSnackbarDispatch };
