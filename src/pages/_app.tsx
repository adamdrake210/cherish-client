// import App from 'next/app'
import React from 'react';
import { CacheProvider } from '@emotion/react';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  PaletteMode,
} from '@mui/material';
import { EmotionCache } from '@emotion/cache';
import { SnackbarProvider } from 'notistack';
import NextNProgress from 'nextjs-progressbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { UserProvider } from '@/context/userContext';
import getDesignTokens from '@/styles/theme';
import createEmotionCache from '@/helpers/createEmotionCache';
import { AppProps } from 'next/app';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

// Create a client
const queryClient = new QueryClient();

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppProps & { emotionCache: EmotionCache }) => {
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
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider>
              <SnackbarProvider>
                <NextNProgress color="#c2185b" />
                <Component {...pageProps} />
              </SnackbarProvider>
            </UserProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </CacheProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default MyApp;
