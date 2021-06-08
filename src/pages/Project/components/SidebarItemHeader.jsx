import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '1.125rem',
    fontWeight: 400
  }
}));

export default function SidebarItemHeader({ header }) {
  const classes = useStyles();
  return (
    <Typography variant="h6" className={classes.root} gutterBottom>
      {header}
    </Typography>
  );
}

SidebarItemHeader.propTypes = {
  header: PropTypes.string.isRequired
};
