import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Page from './Page';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Search from './pages/Search';
import Profile from './pages/Profile';

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Page path="/" component={Landing} exact noBars />
        <Page path="/dashboard" component={Dashboard} exact />
        <Page path="/explore" component={Explore} exact />
        <Page path="/search" component={Search} exact />
        <Page path="/user/:username" component={Profile} exact />
        <Page path="/login" component={SignIn} exact noBars />
        <Page path="/signup" component={SignUp} exact noBars />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
