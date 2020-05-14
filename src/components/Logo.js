import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { Eco as EcoIcon } from '@material-ui/icons';

const styles = (theme) => ({
  primary: {
    '& > svg': {
      color: theme.palette.primary.main
    }
  },
  white: {
    '& > *': {
      color: theme.palette.white
    }
  }
});

function Logo({ classes, color }) {
  return (
    <Link to="/">
      <div className={classes[color] || classes.primary}>
        <EcoIcon />
        <Typography variant="h6" component="span">
          ProjectIncubator
        </Typography>
      </div>
    </Link>
  );
}

Logo.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'white'])
};

export default withStyles(styles)(Logo);
