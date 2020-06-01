import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Typography, withStyles } from '@material-ui/core';
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
        className={clsx(classes[color], classes[size])}
      >
        <img alt="Logo" src={Eco} className={classes.icon} />
        <Typography variant="h6" component="span" className={classes.text}>
          ProjectIncubator
        </Typography>
      </div>
    </Link>
  );
}

Logo.defaultProps = {
  color: 'primary',
  size: 'default'
};

Logo.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'white']),
  size: PropTypes.oneOf(['default', 'small', 'large'])
};

export default withStyles(styles)(Logo);
