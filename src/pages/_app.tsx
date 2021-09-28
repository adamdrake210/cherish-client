// import App from 'next/app'
import React from 'react';
import { CacheProvider } from '@emotion/react';
import 'react-datepicker/dist/react-datepicker.css';
import { ThemeProvider } from '@mui/styles';
import { createTheme, CssBaseline, PaletteMode } from '@mui/material';

import Nav from '../components/Nav';
import { UserProvider } from '../context/userContext';
import { SnackbarProvider } from '../context/snackbarContext';
import SnackbarContainer from '../containers/SnackbarContainer';
import getDesignTokens from '../styles/theme';

import createEmotionCache from '../helpers/createEmotionCache';
import '../styles/styles.scss';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [mode, setMode] = React.useState<PaletteMode>('dark');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <CacheProvider value={emotionCache}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserProvider>
            <SnackbarProvider>
              <Nav />
              <Component {...pageProps} />
              <SnackbarContainer />
            </SnackbarProvider>
          </UserProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
