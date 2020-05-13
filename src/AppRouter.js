import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CssBaseline from '@material-ui/core/CssBaseline';

import PrivateRoute from './PrivateRoute';
import SideBar from './components/SideBar';
import AppBar from './components/AppBar';

function AppRouter() {
  return (
    <>
      <CssBaseline />
      <AppBar />
      <SideBar />
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path="/" component={() => <div></div>} />
        </Switch>
      </Router>
    </>
  );
}

export default AppRouter;
