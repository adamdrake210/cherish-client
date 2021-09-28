import { PaletteMode } from '@mui/material';
import { amber, deepOrange, grey } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: ['"Helvetica Neue"', 'Helvetica', 'sans-serif'].join(','),
  },
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          // palette values for light mode
          primary: {
            main: '#fcfbba',
          },
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});

export default getDesignTokens;
