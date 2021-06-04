import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(1.5)
  },
  description: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
    borderRadius: '18px',
    width: '100%',
    padding: theme.spacing(4, 3)
  }
}));

export default function Description({ content }) {
  const classes = useStyles();
  const { header, text } = content;

  return (
    <div>
      {header && (
        <Typography variant="h4" className={classes.header}>
          {header}
        </Typography>
      )}
      <div className={classes.description}>
        <Typography variant="body1">{text}</Typography>
      </div>
    </div>
  );
}

Description.propTypes = {
  content: PropTypes.shape({
    header: PropTypes.string,
    text: PropTypes.string
  })
};
