import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Switch, Route, Redirect, useParams } from 'react-router-dom';
import {
  Container,
  Hidden,
  Typography,
  Divider,
  CircularProgress,
  Link
} from '@material-ui/core';

import { projects } from '../../mocks';
import { useStyles, activeLink } from './ProjectStyles';
import { Overview, About, Timeline, Discussions } from './pages';
import { FeatureImage } from './components';
import { DialogContext } from '../../contexts';

export default function Project({ match }) {
  const classes = useStyles();
  const projectId = useParams().projectId.toLowerCase();

  const { open, setOpen, setProjectId } = useContext(DialogContext);
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
    setProjectId(projectId.split(' ').join('-'));
    setFetching(false);
  }, [projectId, open, setProjectId]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const renderNavLinks = () => {
    return project.pages
      .filter((el) => el.showing)
      .map((el) => (
        <NavLink
          key={el.id}
          to={`${match.url}/${el.content.title}`}
          onClick={scrollToTop}
          activeStyle={activeLink}
        >
          {el.content.title[0].toUpperCase() + el.content.title.slice(1)}
        </NavLink>
      ));
  };

  const renderAdminLinks = () => {
    return (
      <div className={classes.adminLinks}>
        <Divider />
        <Link onClick={() => setOpen('project-settings')}>Settings</Link>
      </div>
    );
  };

  const renderRoutes = () => {
    return (
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
        <Route exact path={match.url + '/timeline'} component={Timeline} />
        <Route
          exact
          path={match.url + '/discussions'}
          component={Discussions}
        />
      </Switch>
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
          <FeatureImage featureImage={project.cover_photo} />
          <div className={classes.main}>
            <div className={classes.margins} />
            <Container maxWidth="lg" className={classes.container}>
              {/*Sticky Desktop Sidebar*/}
              <Hidden mdDown>
                <div className={classes.sidebar}>
                  <div className={classes.sidebarMenu}>
                    {renderNavLinks()}
                    {renderAdminLinks()}
                  </div>
                </div>
              </Hidden>
              {/*Sticky Mobile Navbar*/}
              <Hidden lgUp>
                <div className={classes.navbarMobile}>
                  <div className={classes.navbarMenu}>{renderNavLinks()}</div>
                </div>
              </Hidden>
              <div className={classes.content}>{renderRoutes()}</div>
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
