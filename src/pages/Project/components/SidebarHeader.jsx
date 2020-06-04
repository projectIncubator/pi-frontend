import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '1.125rem',
    fontWeight: 400
  }
}));

export default function SidebarHeader({ text }) {
  const classes = useStyles();
  return (
    <Typography variant="h6" className={classes.root} gutterBottom>
      {text}
    </Typography>
  );
}

SidebarHeader.propTypes = {
  text: PropTypes.string.isRequired
};
