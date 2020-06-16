import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.paper
  },
  main: {
    display: 'flex',
    minHeight: `calc(100vh - ${theme.dimensions.appbarHeight} - 300px)`,
    [theme.breakpoints.down('lg')]: {
      minHeight: `calc(100vh - ${theme.dimensions.appbarHeight} - 250px)`
    },
    [theme.breakpoints.down('md')]: {
      minHeight: `calc(100vh - ${theme.dimensions.appbarHeight} - 200px)`
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: `calc(100vh - ${theme.dimensions.appbarHeight} - 150px)`
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: `calc(100vh - ${theme.dimensions.appbarHeight} - 100px)`
    }
  },
  margins: {
    minHeight: 1,
    minWidth: 150,
    [theme.breakpoints.down('md')]: {
      minWidth: 75
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 10
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 0
    }
  },
  container: {
    width: '100%',
    position: 'relative'
  },
  sidebar: {
    width: 250,
    position: 'absolute',
    height: 'calc(100% - 88px)', // the subtraction must match the top attribute
    top: 88,
    left: -280
  },
  sidebarMenu: {
    position: 'sticky',
    top: 130,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& > *': {
      marginBottom: theme.spacing(1),
      userSelect: 'none',
      fontSize: '1rem'
    }
  },
  navbarMobile: {
    position: 'sticky',
    top: 48,
    display: 'flex',
    justifyContent: 'center',
    borderTop: 'none',
    borderBottom: 'none',
    zIndex: 1,
    background: theme.palette.background.paper
  },
  navbarMenu: {
    width: '100%',
    height: 42,
    margin: theme.spacing(0, 3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *:not(:first-child)': {
      marginLeft: theme.spacing(3)
    }
  },
  adminLinks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& > hr': {
      marginTop: '4px',
      width: 90
    },
    '& > *': {
      marginBottom: theme.spacing(1),
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'none'
      }
    }
  },
  content: {
    padding: theme.spacing(3, 0),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 0)
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 0)
    }
  },
  blankAndCentered: {
    height: `calc(100vh - ${theme.dimensions.appbarHeight})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%'
  }
}));

export const activeLink = {
  fontWeight: 500
};
