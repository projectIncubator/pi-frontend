import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './PrivateRoute';
import SideBar from './components/SideBar';
import AppBar from './components/AppBar';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Search from './pages/Search';

const NavRoute = ({ exact, path, component: Component }) => (
  <Route
    exact={exact}
    path={path}
    render={(props) => (
      <div>
        <AppBar />
        <SideBar />
        <div
          style={{
            marginTop: 50,
            marginLeft: 58,
            height: 'calc(100vh - 50px)'
          }}
        >
          <Component {...props} />
        </div>
      </div>
    )}
  />
);

function AppRouter() {
  return (
    <>
      <CssBaseline />
      <Router history={createBrowserHistory()}>
        <Switch>
          <NavRoute exact path="/dashboard" component={Dashboard} />
          <NavRoute exact path="/explore" component={Explore} />
          <NavRoute exact path="/search" component={Search} />
          <Route path="/regular" component={() => <div>No Appbar!</div>} />
          <NavRoute path="/" component={() => <Redirect to="/dashboard" />} />
        </Switch>
      </Router>
    </>
  );
}

export default AppRouter;
