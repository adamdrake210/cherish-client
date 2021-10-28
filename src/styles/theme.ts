import { PaletteMode } from '@mui/material';
import { blue, grey, red, yellow } from '@mui/material/colors';

const font = "'Raleway', sans-serif";

const getDesignTokens = (mode: PaletteMode) => ({
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: font,
        color: blue[700],
      },
    },
  },
  typography: {
    fontFamily: font,
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
            main: red[400],
          },
          divider: yellow[200],
          text: {
            primary: grey[600],
            secondary: grey[800],
          },
          background: {
            paper: grey[200],
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
