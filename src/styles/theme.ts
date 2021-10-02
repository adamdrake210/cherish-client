import { PaletteMode } from '@mui/material';
import { blue, grey, yellow } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: ['Raleway', 'sans-serif'].join(','),
  },
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          // palette values for light mode
          primary: {
            main: yellow[200],
          },
          secondary: {
            main: yellow[400],
          },
          divider: yellow[200],
          text: {
            primary: blue[600],
            secondary: blue[800],
          },
          background: {
            paper: grey[100],
          },
        }
      : {
          // palette values for dark mode
          primary: blue,
          divider: blue[200],
          background: {
            default: blue[700],
            paper: blue[700],
          },
          text: {
            primary: yellow[900],
            secondary: yellow[200],
          },
        }),
  },
});

export default getDesignTokens;
