import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Eco from '../assets/logo.png';

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
  icon: {
    height: 20,
    paddingRight: 4
  },
  text: {
    fontWeight: 400
  },
  default: {},
  small: {},
  large: {
    '& > *': {
      fontSize: '2rem'
    }
  }
});

function Logo({ classes, color, size }) {
  return (
    <Link to="/">
      <div
        className={`${classes[color] || classes.primary} ${
          classes[size] || classes.default
        }`}
      >
        <img src={Eco} className={classes.icon} />
        <Typography variant="h6" component="span" className={classes.text}>
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
