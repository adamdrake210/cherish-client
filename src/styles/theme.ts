import { PaletteMode } from '@mui/material';
import { blue, grey, red, yellow } from '@mui/material/colors';

const font = "'Raleway', sans-serif";

const getDesignTokens = (mode: PaletteMode) => ({
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: font,
        // color: blue[700],
      },
    },
  },
  typography: {
    fontFamily: font,
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            light: yellow[100],
            main: yellow[400],
            dark: yellow[700],
          },
          secondary: {
            main: red[400],
          },
          // divider: yellow[200],
          text: {
            primary: grey[600],
            secondary: grey[800],
          },
          background: {
            paper: grey[400],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            light: blue[100],
            main: blue[400],
            dark: blue[700],
          },
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
