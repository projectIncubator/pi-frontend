import React from 'react';
import { Router, Switch } from 'react-router-dom';
import history from './utils/history';

import Page from './Page';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Project from './pages/Project/Project';

function AppRouter() {
  return (
    <Router history={history}>
      <Switch>
        {/*No Bars*/}
        <Page path="/" component={Landing} exact noBars />

        {/*With Bars*/}
        <Page path="/dashboard" component={Dashboard} exact requireAuth />
        <Page path="/explore" component={Explore} exact />
        <Page path="/search" component={Search} exact />
        <Page path="/user/:username" component={Profile} exact />
        <Page path="/project/:projectId" component={Project} fullWidth />
      </Switch>
    </Router>
  );
}

export default AppRouter;
