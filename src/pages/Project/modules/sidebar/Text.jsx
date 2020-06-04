import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import SidebarHeader from '../../components/SidebarHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '0.875rem'
  }
}));

export default function Text({ header, text }) {
  const classes = useStyles();
  return (
    <div>
      {header && <SidebarHeader text={header} />}
      <Typography className={classes.root} variant="body2">
        {text}
      </Typography>
    </div>
  );
}

Text.propTypes = {
  text: PropTypes.string.isRequired,
  header: PropTypes.string
};
