import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import SidebarHeader from '../../components/SidebarHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '0.875rem'
  }
}));

export default function Text({ content }) {
  const classes = useStyles();
  const { header, text } = content;

  return (
    <div>
      {header && <SidebarHeader header={header} />}
      <Typography className={classes.root} variant="body2">
        {text}
      </Typography>
    </div>
  );
}

Text.propTypes = {
  content: PropTypes.object.isRequired
};
