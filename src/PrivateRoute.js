import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

function PrivateRoute({ path, component: Component, ...rest }) {
  return (
    <Route path={path} {...rest} render={(props) => <Component {...props} />} />
  );
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  rest: PropTypes.object.isRequired
};

export default PrivateRoute;
