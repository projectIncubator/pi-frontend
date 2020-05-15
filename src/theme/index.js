import { green } from '@material-ui/core/colors';

export default {
  palette: {
    primary: {
      main: green['400']
    }
  },
  props: {
    MuiButton: {
      disableElevation: true
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  dimensions: {
    drawerWidth: '58px'
  }
};
