import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import SidebarHeader from '../../components/SidebarHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '0.875rem'
  }
}));

export default function Membership({ members, content }) {
  const classes = useStyles();
  const { header } = content;
  return (
    <div>
      {header && <SidebarHeader header={header + ` - ${members.length}`} />}
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
  content: PropTypes.object.isRequired
};
