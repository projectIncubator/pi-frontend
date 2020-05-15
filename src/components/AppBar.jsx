import React from 'react';
import { NavLink } from 'react-router-dom';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar as MUIAppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Logo from './Logo';

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
        color: theme.palette.text.primary
      }
    }
  },
  activeMenu: {
    color: theme.palette.text.primary
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
  const theme = useTheme();
  const activeLinkColor = theme.palette.text.primary;

  return (
    <MUIAppBar
      position="fixed"
      className={classes.appBar}
      color="inherit"
      variant="outlined"
    >
      <Toolbar variant="dense" className={classes.toolBar} disableGutters>
        <Logo />
        <div className={classes.navigation}>
          <Container fixed className={classes.menu}>
            <Typography className={classes.menuItems}>
              <NavLink to="/dashboard" activeStyle={{ color: activeLinkColor }}>
                Dashboard
              </NavLink>
              <NavLink to="/explore" activeStyle={{ color: activeLinkColor }}>
                Explore
              </NavLink>
              <NavLink to="/search" activeStyle={{ color: activeLinkColor }}>
                Search
              </NavLink>
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
