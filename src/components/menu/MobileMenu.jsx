import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import { useAuth } from '../../hooks';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
});

export default function MobileMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const activeLinkColor = theme.palette.text.primary;

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const MenuItem = ({ icon, text, to, ...props }) => {
    return (
      <ListItem button {...props}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>
          {to ? (
            <NavLink
              to={to}
              activeStyle={{ color: activeLinkColor, fontWeight: 500 }}
            >
              {text}
            </NavLink>
          ) : (
            text
          )}
        </ListItemText>
      </ListItem>
    );
  };

  const renderProjectList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {isAuthenticated && (
          <MenuItem icon={<HomeIcon />} to="/dashboard" text="Dashboard" />
        )}
        <MenuItem icon={<ExploreIcon />} to="/explore" text="Explore" />
        <MenuItem icon={<SearchIcon />} to="/search" text="Search" />
      </List>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <MenuItem
            key={text}
            icon={index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            text={text}
          />
        ))}
      </List>
    </div>
  );

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {renderProjectList()}
      </SwipeableDrawer>
    </>
  );
}
