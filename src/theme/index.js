import { green, blue } from '@material-ui/core/colors';

export default {
  overrides: {
    MuiButton: {
      root: {
        transition: 'none',
        '&:hover': {
          filter: 'brightness(110%)'
        }
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: green['400']
        }
      }
    }
  },
  palette: {
    primary: {
      light: green['300'],
      main: green['400'],
      dark: green['700']
    }
  },
  props: {
    MuiButton: {
      color: 'primary',
      disableElevation: true,
      variant: 'contained'
    },
    MuiLink: {
      color: 'textPrimary',
      underline: 'hover'
    },
    MuiPaper: {
      square: true,
      variant: 'outlined'
    },
    MuiTypography: {
      component: 'p'
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
