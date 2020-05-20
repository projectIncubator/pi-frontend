import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import AppBar from './components/AppBar';
import SideBar from './components/SideBar';

const styles = (theme) => ({
  root: {
    height: '100%',
    padding: `50px 0 0 ${theme.dimensions.drawerWidth}`
  },
  container: {
    height: '100%'
  }
});

function Page({
  classes,
  component: Component,
  fullWidth,
  noBars,
  requireAuth,
  ...rest
}) {
  return noBars ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
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
              <Container className={classes.container} maxWidth="lg">
                <Component {...props} />
              </Container>
            )
          }
        />
      </div>
    </>
  );
}

Page.defaultProps = {
  fullWidth: false,
  noBars: false,
  requireAuth: false
};

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  fullWidth: PropTypes.bool.isRequired,
  noBars: PropTypes.bool.isRequired,
  requireAuth: PropTypes.bool.isRequired,
  rest: PropTypes.object
};

export default withStyles(styles)(Page);
