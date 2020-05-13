import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar as MUIAppBar } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import EcoIcon from '@material-ui/icons/Eco';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolBar: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    display: 'flex'
  },
  navigation: {
    flex: 1
  },
  menu: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  menuItems: {
    display: 'flex',
    alignItems: 'center',
    '& > a:not(:first-child)': {
      marginLeft: theme.spacing(3)
    },
    '& > a': {
      color: theme.palette.text.secondary,
      '&:hover': {
        textDecoration: 'none',
        color: theme.palette.text.primary
      }
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  },
  account: {}
}));

export default function AppBar() {
  const classes = useStyles();

  return (
    <MUIAppBar
      position="fixed"
      className={classes.appBar}
      color="inherit"
      variant="outlined"
    >
      <Toolbar variant="dense" className={classes.toolBar} disableGutters>
        <div className={classes.logo}>
          <EcoIcon style={{ color: green[500] }} fontSize="default" />
          <Typography variant="h6" noWrap>
            projectIncubator
          </Typography>
        </div>
        <div className={classes.navigation}>
          <Container fixed className={classes.menu}>
            <Typography className={classes.menuItems}>
              <Link href="#" onClick={(e) => e.preventDefault()}>
                Dashboard
              </Link>
              <Link href="#" onClick={(e) => e.preventDefault()}>
                Explore
              </Link>
              <Link href="#" onClick={(e) => e.preventDefault()}>
                Search
              </Link>
            </Typography>
            <div className={classes.search}>
              <TextField
                id="search-field"
                placeholder="Search..."
                variant="outlined"
                size="small"
              />
            </div>
          </Container>
        </div>
        <div className={classes.account}>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </div>
      </Toolbar>
    </MUIAppBar>
  );
}
