import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import AppBar from './components/AppBar';
import SideBar from './components/SideBar';

const styles = (theme) => ({
  root: {
    padding: `50px 0 0 ${theme.dimensions.drawerWidth}`
  }
});

function WithBars({ classes, path, component: Component, ...rest }) {
  return (
    <>
      <AppBar />
      <SideBar />
      <div className={classes.root}>
        <Route
          path={path}
          {...rest}
          render={(props) => <Component {...props} />}
        />
      </div>
    </>
  );
}

WithBars.propTypes = {
  classes: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  rest: PropTypes.object
};

export default withStyles(styles)(WithBars);
