import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Hidden } from '@material-ui/core';

import Header from '../components/Header';
import SidebarButton from '../modules/sidebar/SidebarButton';
import Membership from '../modules/sidebar/Membership';

export default function Overview({ project }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Header title={project.title} isAdmin status="ongoing" />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
          <p key={el}>
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
          </p>
        ))}
      </Grid>
      <Hidden smDown>
        <Grid item md={3}>
          {project.pages.overview.sidebarModules.map((module) => {
            switch (module.type) {
              case 'button':
                return <SidebarButton {...module} />;
              case 'membership':
                return <Membership members={project.members} {...module} />;
              default:
                return;
            }
          })}
        </Grid>
      </Hidden>
    </Grid>
  );
}

Overview.propTypes = {
  project: PropTypes.object.isRequired
};
