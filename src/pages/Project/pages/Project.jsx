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

import { projects } from '../../../mocks';
import {
  ProjectProvider,
  ProjectContext,
  DialogContext
} from '../../../contexts';
import { useStyles, activeLink } from './ProjectStyles';
import { Overview, General, Timeline, Discussions, Error404 } from './index';
import { FeatureImage } from '../components';
import ProjectDialogs from '../dialogs';

export default function ProjectWithContext({ match }) {
  return (
    <ProjectProvider>
      <Project match={match} />
      <ProjectDialogs />
    </ProjectProvider>
  );
}

function Project({ match }) {
  const classes = useStyles();
  const projectId = useParams().projectId.toLowerCase();

  const { open, setOpen } = useContext(DialogContext);
  const { project, setProject, setProjectId } = useContext(ProjectContext);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getProject = (projectId) => {
      return projects.find(
        (project) =>
          project.meta.title.toLowerCase().split(' ').join('-') === projectId
      );
    };
    const project = getProject(projectId);
    if (project) setProject({ ...project });
    setProjectId(project.meta.id);
    setFetching(false);
  }, [projectId, open, setProjectId, setProject]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const renderNavLinks = () => {
    return project.meta.pages_order
      .filter((el) => el.showing)
      .map((el) => (
        <NavLink
          key={el.id}
          to={`${match.url}/${el.title.toLowerCase().split(' ').join('-')}`}
          onClick={scrollToTop}
          activeStyle={activeLink}
        >
          {el.title[0].toUpperCase() + el.title.slice(1)}
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
    const currentUrl =
      match.url[match.url.length - 1] === '/'
        ? match.url.slice(0, match.url.length - 1)
        : match.url;

    const renderComponent = (type, pageId, props) => {
      const componentWrapper = (Component) => {
        return <Component project={project} pageId={pageId} {...props} />;
      };

      switch (type) {
        case 'overview':
          return componentWrapper(Overview);
        case 'discussions':
          return componentWrapper(Discussions);
        case 'timeline':
          return componentWrapper(Timeline);
        case 'general':
          return componentWrapper(General);
        default:
          return;
      }
    };

    const routeWrapper = (type, title, pageId) => {
      return (
        <Route
          key={pageId}
          exact
          path={currentUrl + '/' + title.toLowerCase().split(' ').join('-')}
          render={(props) => renderComponent(type, pageId, props)}
        />
      );
    };

    return (
      <Switch>
        <Route exact path={currentUrl}>
          <Redirect to={currentUrl + '/overview'} />
        </Route>
        {project.meta.pages_order.map((el) =>
          routeWrapper(el.type, el.title, el.id)
        )}
        <Route
          path={currentUrl + '/*'}
          component={(props) => <Error404 project={project} {...props} />}
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
          <FeatureImage featureImage={project.meta.cover_photo} />
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
