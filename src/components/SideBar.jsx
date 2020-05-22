import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

export default function SideBar() {
  const classes = useStyles();

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
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
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
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
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
