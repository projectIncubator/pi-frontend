import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import SidebarHeader from '../../components/SidebarHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    // fontWeight: 300
    fontSize: '0.875rem'
  }
}));

export default function Membership({ members, header }) {
  const classes = useStyles();
  return (
    <div>
      {header && <SidebarHeader text={header + ` - ${members.length}`} />}
      {members.map((member) => {
        return (
          <Typography key={member} className={classes.root} variant="body2">
            {member}
          </Typography>
        );
      })}
    </div>
  );
}

Membership.propTypes = {
  members: PropTypes.array.isRequired,
  header: PropTypes.string
};
