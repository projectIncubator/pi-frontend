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
      color: theme.palette.common.white
    }
  },
  default: {},
  small: {},
  large: {
    '& > *': {
      fontSize: '2rem'
    }
  }
});

function Logo({ classes, color , size}) {
  return (
    <Link to="/">
      <div className={`${classes[color] || classes.primary} ${classes[size] || classes.default}`}>
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
  color: PropTypes.oneOf(['primary', 'white']),
  size: PropTypes.oneOf(['small', 'large'])
};

export default withStyles(styles)(Logo);
