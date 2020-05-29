import React, { useContext } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Page from './Page';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Project from './pages/Project/Project';
import lightTheme from './theme/lightTheme';
import darkTheme from './theme/darkTheme';
import { GeneralContext } from './contexts';
import { CssBaseline } from '@material-ui/core';

const light = createMuiTheme(lightTheme);
const dark = createMuiTheme(darkTheme);

function AppRouter() {
  const { isDarkMode } = useContext(GeneralContext);

  return (
    <MuiThemeProvider theme={isDarkMode ? dark : light}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          {/*No Bars*/}
          <Page path="/" component={Landing} exact noBars />
          <Page path="/login" component={SignIn} exact noBars />
          <Page path="/signup" component={SignUp} exact noBars />

          {/*With Bars*/}
          <Page path="/dashboard" component={Dashboard} exact />
          <Page path="/explore" component={Explore} exact />
          <Page path="/search" component={Search} exact />
          <Page path="/user/:username" component={Profile} exact />
          <Page path="/project/:projectId" component={Project} fullWidth />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default AppRouter;
