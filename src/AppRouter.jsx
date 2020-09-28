import React from 'react';
import { Router, Switch } from 'react-router-dom';
import history from './utils/history';

import Page from './Page';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Search from './pages/Search';
import Profile from './pages/Profile';
import ProjectWithContext from './pages/Project/pages/Project';

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
        <Page path="/user/:profileId" component={Profile} exact />
        <Page
          path="/project/:projectId"
          component={ProjectWithContext}
          fullWidth
        />
      </Switch>
    </Router>
  );
}

export default AppRouter;
