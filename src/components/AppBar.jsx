import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar as MUIAppBar,
  Button,
  Container,
  Divider,
  Fade,
  Hidden,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  TextField,
  Toolbar,
  Typography,
  fade,
  makeStyles,
  useTheme,
  withStyles
} from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
  Brightness2 as Brightness2Icon,
  Chat as ChatIcon,
  ExitToApp as ExitToAppIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  WbSunny as WbSunnyIcon
} from '@material-ui/icons';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { ThemeContext } from '../contexts';
import { useAuth } from '../hooks';

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
  searchInput: {
    fontSize: '1rem',
    padding: theme.spacing(1, 2)
  },
  buttonsContainer: {
    margin: theme.spacing(0, 1, 0, 0)
  },
  authButtons: {
    '& > * + *': {
      margin: theme.spacing(0, 1)
    }
  },
  accountButton: {
    borderColor: theme.palette.action.disabled,
    '& svg': {
      color: theme.palette.text.secondary
    }
  },
  menuList: {
    padding: theme.spacing(0),
    width: '220px',
    '&:focus': {
      outline: 'none'
    }
  },
  divider: {
    margin: theme.spacing(1, 0)
  }
}));

const StyledMenu = withStyles((theme) => ({
  paper: {
    // borderTop: 'none',
    marginTop: '14px',
    borderRadius: '4px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10'
    }
  }
}))((props) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    TransitionComponent={Fade}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    height: 40
  }
}))(MenuItem);

// removes warning for Hidden within MenuList
const MiddleWare = ({ children, ...props }) => children(props);

export default function AppBar() {
  const theme = useTheme();
  const classes = useStyles();
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const activeLinkColor = theme.palette.text.primary;
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userMenu = isAuthenticated ? (
    <MenuList className={classes.menuList}>
      <MiddleWare>
        {(props) => (
          <Hidden mdUp>
            <StyledMenuItem>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <Typography variant="inherit">Chat</Typography>
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <Typography variant="inherit">Notifications</Typography>
            </StyledMenuItem>
            <Divider className={classes.divider} />
          </Hidden>
        )}
      </MiddleWare>
      <StyledMenuItem>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <Typography variant="inherit">Profile</Typography>
      </StyledMenuItem>
      <StyledMenuItem onClick={() => setIsDarkMode(!isDarkMode)}>
        <ListItemIcon>
          {isDarkMode ? <WbSunnyIcon /> : <Brightness2Icon />}
        </ListItemIcon>
        <Typography variant="inherit">
          Turn Lights {isDarkMode ? 'On' : 'Off'}
        </Typography>
      </StyledMenuItem>
      <StyledMenuItem>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <Typography variant="inherit">Settings</Typography>
      </StyledMenuItem>
      <StyledMenuItem onClick={() => logout()}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <Typography variant="inherit">Logout</Typography>
      </StyledMenuItem>
    </MenuList>
  ) : (
    <MenuList className={classes.menuList}>
      <StyledMenuItem onClick={() => setIsDarkMode(!isDarkMode)}>
        <ListItemIcon>
          {isDarkMode ? <WbSunnyIcon /> : <Brightness2Icon />}
        </ListItemIcon>
        <Typography variant="inherit">
          Turn Lights {isDarkMode ? 'On' : 'Off'}
        </Typography>
      </StyledMenuItem>
      <Hidden mdUp>
        <StyledMenuItem onClick={() => loginWithRedirect()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Typography variant="inherit">Log In / Sign Up</Typography>
        </StyledMenuItem>
      </Hidden>
    </MenuList>
  );

  return (
    <MUIAppBar
      position="fixed"
      className={classes.appBar}
      color="inherit"
      variant="outlined"
    >
      <Toolbar variant="dense" className={classes.toolBar} disableGutters>
        <Hidden mdUp>
          <MobileMenu />
        </Hidden>
        <Logo />
        <Hidden smDown>
          <div className={classes.navigation}>
            <Container fixed className={classes.menu}>
              <Typography className={classes.menuItems}>
                {isAuthenticated && (
                  <NavLink
                    to="/dashboard"
                    activeStyle={{ color: activeLinkColor }}
                  >
                    Dashboard
                  </NavLink>
                )}
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
                  InputProps={{
                    classes: {
                      input: classes.searchInput
                    }
                  }}
                />
              </div>
            </Container>
          </div>
        </Hidden>
        <div>
          <Hidden smDown>
            {isAuthenticated ? (
              <span className={classes.buttonsContainer}>
                <IconButton>
                  <ChatIcon />
                </IconButton>
                <IconButton>
                  <NotificationsIcon />
                </IconButton>
              </span>
            ) : (
              <span className={classes.authButtons}>
                <Button variant="outlined" onClick={() => loginWithRedirect()}>LOG IN</Button>
                <Button onClick={() => loginWithRedirect()}>SIGN UP</Button>
              </span>
            )}
          </Hidden>
          <Hidden smDown>
            <Button
              className={classes.accountButton}
              aria-controls="fade-menu"
              aria-haspopup="true"
              endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              color="inherit"
              variant="outlined"
              onClick={handleClick}
            >
              {user ? user.email : <PersonIcon />}
            </Button>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              onClick={handleClick}
              aria-controls="fade-menu"
              aria-haspopup="true"
            >
              <AccountCircleIcon color="inherit" fontSize="default" />
            </IconButton>
          </Hidden>
          <StyledMenu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            keepMounted
          >
            {userMenu}
          </StyledMenu>
        </div>
      </Toolbar>
    </MUIAppBar>
  );
}
