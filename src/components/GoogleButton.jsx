import { Button, withStyles } from '@material-ui/core';
import React from 'react';

const styles = (theme) => ({
  root: {
    backgroundColor: '#4285F4', // Google color
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#4285F4',
      filter: 'brightness(110%)'
    }
  }
});

function GoogleButton({ classes, children }) {
  return (
    <Button
      className={classes.root}
      variant="contained"
      // startIcon={<FaGoogle />}
    >
      {' '}
      {children}
    </Button>
  );
}

export default withStyles(styles)(GoogleButton);
