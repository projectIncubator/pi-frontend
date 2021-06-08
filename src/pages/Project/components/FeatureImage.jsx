import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  feature: {
    width: '100%',
    backgroundImage: (props) => `url("${props.featureImage}")`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 300,
    [theme.breakpoints.down('lg')]: {
      height: 250
    },
    [theme.breakpoints.down('md')]: {
      height: 200
    },
    [theme.breakpoints.down('sm')]: {
      height: 150
    },
    [theme.breakpoints.down('xs')]: {
      height: 100
    }
  }
}));

export default function FeatureImage(props) {
  const classes = useStyles(props);
  return <div className={classes.feature} />;
}

FeatureImage.propTypes = {
  featureImage: PropTypes.string
};
