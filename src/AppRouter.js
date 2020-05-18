import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Page from './Page';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Search from './pages/Search';
import Profile from './pages/Profile';

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Page path="/" component={Landing} exact />
        <Page path="/dashboard" component={Dashboard} exact withBars />
        <Page path="/explore" component={Explore} exact withBars />
        <Page path="/search" component={Search} exact withBars />
        <Page path="/user" component={Profile} exact withBars />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
