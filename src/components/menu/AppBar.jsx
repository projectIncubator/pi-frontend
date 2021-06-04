import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar as MUIAppBar,
  Button,
  Container,
  Divider,
  Hidden,
  IconButton,
  ListItemIcon,
  MenuList,
  TextField,
  Toolbar,
  Typography,
  useTheme
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
import { useStyles, StyledMenu, StyledMenuItem } from './AppBarStyles';
import Logo from '../Logo';
import MobileMenu from './MobileMenu';
import { ThemeContext } from '../../contexts';
import { useAuth } from '../../hooks';

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

  const MenuItem = ({ icon, text, ...props }) => {
    return (
      <StyledMenuItem {...props}>
        <ListItemIcon>{icon}</ListItemIcon>
        <Typography variant="inherit">{text}</Typography>
      </StyledMenuItem>
    );
  };

  const userMenu = isAuthenticated ? (
    <MenuList className={classes.menuList}>
      <MiddleWare>
        {(props) => (
          <Hidden mdUp>
            <MenuItem icon={<ChatIcon />} text="Chat" />
            <MenuItem icon={<NotificationsIcon />} text="Notifications" />
            <Divider className={classes.divider} />
          </Hidden>
        )}
      </MiddleWare>
      <MenuItem
        icon={<PersonIcon />}
        text="Profile"
        component={NavLink}
        to={'/user/' + (user ? user.profile_id : 'user_not_yet_loaded')}
      />
      <MenuItem
        onClick={() => setIsDarkMode(!isDarkMode)}
        icon={isDarkMode ? <WbSunnyIcon /> : <Brightness2Icon />}
        text={`Turn Lights ${isDarkMode ? 'On' : 'Off'}`}
      />
      <MenuItem icon={<SettingsIcon />} text="Settings" />
      <MenuItem
        onClick={() => logout()}
        icon={<ExitToAppIcon />}
        text="Logout"
      />
    </MenuList>
  ) : (
    <MenuList className={classes.menuList}>
      <MenuItem
        onClick={() => setIsDarkMode(!isDarkMode)}
        icon={isDarkMode ? <WbSunnyIcon /> : <Brightness2Icon />}
        text={`Turn Lights ${isDarkMode ? 'On' : 'Off'}`}
      />
      <Hidden mdUp>
        <MenuItem
          onClick={() => loginWithRedirect()}
          icon={<ExitToAppIcon />}
          text="Log In / Sign Up"
        />
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
                <Button variant="outlined" onClick={() => loginWithRedirect()}>
                  LOG IN
                </Button>
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