import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Switch, Route, Redirect, useParams } from 'react-router-dom';
import {
  Container,
  Hidden,
  Typography,
  CircularProgress
} from '@material-ui/core';

import { projects } from '../../mocks';

import { useStyles, activeLink } from './ProjectStyles';
import Overview from './pages/Overview';
import About from './pages/About';
import Timeline from './pages/Timeline';
import Discussions from './pages/Discussions';
import FeatureImage from './components/FeatureImage';

export default function Project({ match }) {
  const classes = useStyles();
  const projectId = useParams().projectId.toLowerCase();

  const [project, setProject] = useState({});
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getProject = (projectId) => {
      return projects.find(
        (project) =>
          project.title.toLowerCase().split(' ').join('-') === projectId
      );
    };

    const project = getProject(projectId);

    if (project) setProject({ ...project });
    setFetching(false);
  }, [projectId]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const renderNavLinks = () => {
    return (
      <>
        <NavLink
          to={`${match.url}/overview`}
          onClick={scrollToTop}
          activeStyle={activeLink}
        >
          Overview
        </NavLink>
        <NavLink
          to={`${match.url}/about`}
          onClick={scrollToTop}
          activeStyle={activeLink}
        >
          About
        </NavLink>
        <NavLink
          to={`${match.url}/timeline`}
          onClick={scrollToTop}
          activeStyle={activeLink}
        >
          Timeline
        </NavLink>
        <NavLink
          to={`${match.url}/discussions`}
          onClick={scrollToTop}
          activeStyle={activeLink}
        >
          Discussions
        </NavLink>
      </>
    );
  };

  const renderPage = () => {
    if (fetching)
      return (
        <div className={classes.blankAndCentered}>
          <CircularProgress color="primary" />
        </div>
      );
    else if (
      Object.keys(project).length === 0 &&
      project.constructor === Object
    ) {
      return (
        <div className={classes.blankAndCentered}>
          <Typography variant="h5">
            Sorry, this project does not exist. Would you like to create this
            project?
          </Typography>
        </div>
      );
    } else {
      return (
        <>
          <FeatureImage featureImage={project.logo} />
          <div className={classes.main}>
            <div className={classes.margins} />
            <Container maxWidth="lg" className={classes.container}>
              {/*Sticky Desktop Sidebar*/}
              <Hidden mdDown>
                <div className={classes.sidebar}>
                  <div className={classes.sidebarMenu}>{renderNavLinks()}</div>
                </div>
              </Hidden>
              {/*Sticky Mobile Navbar*/}
              <Hidden lgUp>
                <div className={classes.navbarMobile}>
                  <div className={classes.navbarMenu}>{renderNavLinks()}</div>
                </div>
              </Hidden>
              <div className={classes.content}>
                <Switch>
                  <Route exact path={match.url}>
                    <Redirect to={match.url + '/overview'} />
                  </Route>
                  <Route
                    exact
                    path={match.url + '/overview'}
                    render={() => <Overview project={project} />}
                    divider={true}
                  />
                  <Route exact path={match.url + '/about'} component={About} />
                  <Route
                    exact
                    path={match.url + '/timeline'}
                    component={Timeline}
                  />
                  <Route
                    exact
                    path={match.url + '/discussions'}
                    component={Discussions}
                  />
                </Switch>
              </div>
            </Container>
            <div className={classes.margins} />
          </div>
        </>
      );
    }
  };

  return <div className={classes.root}>{renderPage()}</div>;
}

Project.propTypes = {
  match: PropTypes.object.isRequired
};
