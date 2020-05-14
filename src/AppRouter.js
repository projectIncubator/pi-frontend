import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import WithBars from './WithBars';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Search from './pages/Search';

function AppRouter() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <WithBars exact path="/dashboard" component={Dashboard} />
        <WithBars exact path="/explore" component={Explore} />
        <WithBars exact path="/search" component={Search} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
