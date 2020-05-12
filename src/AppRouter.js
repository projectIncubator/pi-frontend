import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';

function AppRouter() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/" component={() => <div></div>} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
