import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  fade,
  makeStyles,
  withStyles,
  useTheme
} from '@material-ui/core/styles';
import { AppBar as MUIAppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChatIcon from '@material-ui/icons/Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';

import MobileMenu from './MobileMenu';
import Logo from './Logo';
import { GeneralContext } from '../contexts';

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
  searchInput: {
    fontSize: '1rem',
    padding: theme.spacing(1, 2)
  },
  accountButton: {
    borderColor: theme.palette.action.disabled
  },
  menuList: {
    padding: theme.spacing(0),
    width: 220,
    '&:focus': {
      outline: 'none'
    }
  },
  listItemIcon: {
    // minWidth: 42 // this creates equal spacing around the menuitem icon
  },
  divider: {
    margin: theme.spacing(1, 0)
  }
}));

const StyledMenu = withStyles((theme) => ({
  paper: {
    // borderTop: 'none',
    borderRadius: 4,
    marginTop: 14,
    [theme.breakpoints.down('sm')]: {
      marginTop: 10
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
  const classes = useStyles();
  const { isDarkMode, setIsDarkMode } = useContext(GeneralContext);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const activeLinkColor = theme.palette.text.primary;
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <NavLink
                  to="/dashboard"
                  activeStyle={{ color: activeLinkColor }}
                >
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
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
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
              Alexander Bergholm
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
            <MenuList className={classes.menuList}>
              <MiddleWare>
                {(props) => (
                  <Hidden mdUp>
                    <StyledMenuItem {...props}>
                      <ListItemIcon className={classes.listItemIcon}>
                        <ChatIcon />
                      </ListItemIcon>
                      <Typography variant="inherit">Chat</Typography>
                    </StyledMenuItem>
                    <StyledMenuItem {...props}>
                      <ListItemIcon className={classes.listItemIcon}>
                        <NotificationsIcon />
                      </ListItemIcon>
                      <Typography variant="inherit">Notifications</Typography>
                    </StyledMenuItem>
                    <Divider className={classes.divider} />
                  </Hidden>
                )}
              </MiddleWare>
              <StyledMenuItem>
                <ListItemIcon className={classes.listItemIcon}>
                  <PersonIcon />
                </ListItemIcon>
                <Typography variant="inherit">Profile</Typography>
              </StyledMenuItem>
              <StyledMenuItem onClick={() => setIsDarkMode(!isDarkMode)}>
                <ListItemIcon className={classes.listItemIcon}>
                  {isDarkMode ? <WbSunnyIcon /> : <Brightness2Icon />}
                </ListItemIcon>
                <Typography variant="inherit">
                  Turn Lights {isDarkMode ? 'On' : 'Off'}
                </Typography>
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon className={classes.listItemIcon}>
                  <SettingsIcon />
                </ListItemIcon>
                <Typography variant="inherit">Settings</Typography>
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon className={classes.listItemIcon}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <Typography variant="inherit">Logout</Typography>
              </StyledMenuItem>
            </MenuList>
          </StyledMenu>
        </div>
      </Toolbar>
    </MUIAppBar>
  );
}
