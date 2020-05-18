import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import AppBar from './components/AppBar';
import SideBar from './components/SideBar';

const styles = (theme) => ({
  root: {
    padding: `50px 0 0 ${theme.dimensions.drawerWidth}`
  }
});

function Page({
  classes,
  component: Component,
  fullWidth,
  requireAuth,
  withBars,
  ...rest
}) {
  return withBars ? (
    <>
      <AppBar />
      <SideBar />
      <div className={classes.root}>
        <Route
          {...rest}
          render={(props) =>
            fullWidth ? (
              <Component {...props} />
            ) : (
              <Container maxWidth="lg">
                <Component {...props} />
              </Container>
            )
          }
        />
      </div>
    </>
  ) : (
    <Route {...rest} render={(props) => <Component {...props} />} />
  );
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  fullWidth: PropTypes.bool,
  requireAuth: PropTypes.bool,
  withBars: PropTypes.bool,
  rest: PropTypes.object
};

export default withStyles(styles)(Page);
