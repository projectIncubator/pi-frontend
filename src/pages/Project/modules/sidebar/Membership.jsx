import React from 'react';
import PropTypes from 'prop-types';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

export default function Membership({ members, header }) {
  return (
    <div>
      {header && <Typography variant="h6">{header}</Typography>}
      <List dense>
        {members.map((member) => {
          return (
            <ListItem>
              <ListItemText primary={member} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

Membership.propTypes = {
  members: PropTypes.array.isRequired,
  header: PropTypes.string
};
