import { PaletteMode } from '@mui/material';
import { grey, indigo, pink, red, yellow } from '@mui/material/colors';

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
            main: indigo[600],
          },
          secondary: {
            main: pink[700],
          },
          background: {
            default: 'rgb(0, 20, 20)',
            paper: indigo[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});

export default getDesignTokens;
