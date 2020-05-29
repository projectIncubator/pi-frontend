import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Container, Paper, Hidden } from '@material-ui/core';

import Overview from './Overview';
import About from './About';
import Timeline from './Timeline';
import Discussions from './Discussions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  feature: {
    width: '100%',
    height: 300,
    background: '#a9e0eb',
    [theme.breakpoints.down('lg')]: {
      height: 250
    },
    [theme.breakpoints.down('md')]: {
      height: 200
    },
    [theme.breakpoints.down('sm')]: {
      height: 150
    },
    [theme.breakpoints.down('xs')]: {
      height: 100
    }
  },
  main: {
    display: 'flex'
  },
  margins: {
    minHeight: 1,
    minWidth: 150,
    [theme.breakpoints.down('md')]: {
      minWidth: 75
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 10
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 0
    }
  },
  container: {
    width: '100%',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      padding: 0
    }
  },
  sidebar: {
    width: 250,
    position: 'absolute',
    height: '100%',
    top: 30,
    left: -260
  },
  sidebarMenu: {
    position: 'sticky',
    top: 130,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& > *': {
      marginBottom: theme.spacing(1)
    }
  },
  navbarMobile: {
    position: 'sticky',
    top: 48,
    display: 'flex',
    justifyContent: 'center',
    borderTop: 'none',
    borderBottom: 'none'
  },
  navbarMenu: {
    width: '100%',
    height: 42,
    margin: theme.spacing(0, 3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *:not(:first-child)': {
      marginLeft: theme.spacing(3)
    }
  },
  page: {
    height: 4000, // scrolling purposes, remove later
    borderTop: 'none',
    padding: theme.spacing(3)
  }
}));

const activeLink = {
  fontWeight: 500
};

export default function Project({ match }) {
  const classes = useStyles();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={classes.root}>
      {/*Feature Image*/}
      <div className={classes.feature}></div>
      {/*Content*/}
      <div className={classes.main}>
        <div className={classes.margins} />
        <Container maxWidth="lg" className={classes.container}>
          {/*Sticky Desktop Sidebar*/}
          <Hidden mdDown>
            <div className={classes.sidebar}>
              <div className={classes.sidebarMenu}>
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
              </div>
            </div>
          </Hidden>
          {/*Sticky Mobile Navbar*/}
          <Hidden lgUp>
            <Paper className={classes.navbarMobile}>
              <div className={classes.navbarMenu}>
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
              </div>
            </Paper>
          </Hidden>
          <Paper className={classes.page}>
            <Switch>
              <Route exact path={match.url}>
                <Redirect to={match.url + '/overview'} />
              </Route>
              <Route
                exact
                path={match.url + '/overview'}
                component={Overview}
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
          </Paper>
        </Container>
        <div className={classes.margins} />
      </div>
    </div>
  );
}

Project.propTypes = {
  match: PropTypes.object.isRequired
};
