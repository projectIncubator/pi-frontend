import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import WithBars from './WithBars';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Search from './pages/Search';

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <WithBars exact path="/dashboard" component={Dashboard} />
        <WithBars exact path="/explore" component={Explore} />
        <WithBars exact path="/search" component={Search} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
