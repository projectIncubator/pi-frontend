import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Hidden, Typography } from '@material-ui/core';

import Header from '../components/Header';
import SidebarButton from '../modules/sidebar/SidebarButton';
import Membership from '../modules/sidebar/Membership';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: 'sticky',
    top: 125,
    [theme.breakpoints.down('md')]: {
      top: 50 + 42
    }
  }
}));

export default function Overview({ project }) {
  const classes = useStyles();

  const renderModules = (el) => {
    switch (el.type) {
      case 'button':
        return <SidebarButton {...el} />;
      case 'membership':
        return <Membership members={project.members} {...el} />;
      default:
        return;
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <Header title={project.title} isAdmin status="ongoing" />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
          <Typography variant="body1" key={el}>
            Lorem ipsum dolor asit amet, consectetur adipiscing elit. Donec
            efficitur eget nisi sit amet gravida. Phasellus eu blandit libero, a
            blandit est. Nullam vestibulum eget magna vel luctus. Morbi ac
            accumsan felis, in congue lacus. Aliquam faucibus, est et mollis
            euismod, lacus lorem consectetur velit, id bibendum nisl ex id
            neque. Cras porta justo non ipsum tincidunt, ac maximus neque
            bibendum. Orci varius natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Sed nibh tortor, placerat non
            suscipit eget, luctus id urna. Phasellus nisl magna, maximus sed
            nunc eget, venenatis sollicitudin diam. Sed metus orci, porttitor
            quis faucibus vel, tincidunt at tortor. Vivamus euismod suscipit
            leo, eu venenatis sem vehicula sit amet. Suspendisse convallis eget
            quam ac egestas.
          </Typography>
        ))}
      </Grid>
      <Hidden smDown>
        <Grid item md={3}>
          <Grid container spacing={2} className={classes.sidebar}>
            {project.pages.overview.sidebarModules.map((el, index) => {
              return (
                <Grid item xs={12} key={index}>
                  {renderModules(el)}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  );
}

Overview.propTypes = {
  project: PropTypes.object.isRequired
};
