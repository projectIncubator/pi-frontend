import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.dimensions.drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: theme.dimensions.drawerWidth,
    overflow: 'hidden'
  },
  // necessary for content to be below app bar
  toolbar: {
    minHeight: 48
  }
}));

export default function SideBar(props) {
  const classes = useStyles();
  const { currentProjects, followedProjects } = props;

  return (
    <Hidden smDown>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {currentProjects.map((text, index) => (
            <Tooltip
              key={'tooltip-' + text}
              title={text}
              placement="right"
              TransitionComponent={Zoom}
              arrow
            >
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
              </ListItem>
            </Tooltip>
          ))}
        </List>
        <Divider />
        <List>
          {followedProjects.map((text, index) => (
            <Tooltip
              key={'tooltip-' + text}
              title={text}
              placement="right"
              TransitionComponent={Zoom}
              arrow
            >
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
    </Hidden>
  );
}

SideBar.defaultProps = {
  currentProjects: [
    'Save The Whales',
    'Clean New York, New York',
    'Wreck Wreck Beach'
  ],
  followedProjects: [
    'Project projectIncubator',
    'Pay Respects to Harambe',
    'Build Sustainable Housing in Vancouver'
  ]
};

SideBar.propTypes = {
  currentProjects: PropTypes.array,
  followingProjects: PropTypes.array
};
