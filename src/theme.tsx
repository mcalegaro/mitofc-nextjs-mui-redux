import { createMuiTheme } from '@material-ui/core/styles';
import { green, yellow, red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[900],
    },
    secondary: {
      main: yellow[500],
    },
    error: {
      main: red.A700,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
