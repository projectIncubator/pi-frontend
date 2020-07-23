import { Button, withStyles } from '@material-ui/core';
import { FaFacebookSquare } from 'react-icons/all';
import React from 'react';

const styles = (theme) => ({
  root: {
    backgroundColor: '#3b5998', // Facebook color
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#3b5998',
      filter: 'brightness(110%)'
    }
  }
});

function FacebookButton({ classes, children }) {
  return (
    <Button
      className={classes.root}
      variant="contained"
      startIcon={<FaFacebookSquare />}
    >
      {' '}
      {children}
    </Button>
  );
}

export default withStyles(styles)(FacebookButton);
