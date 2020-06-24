import React from 'react';
import { projectType } from '../../../types';
import { Grid, Typography } from '@material-ui/core';

import { Header, Sidebar } from '../components';

export default function Overview({ project }) {
  const page = project.pages.find((el) => el.type === 'overview');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={page.sidebar ? 9 : 12}>
        <Header
          page="overview"
          title={project.title}
          isAdmin
          status="ongoing"
        />
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
      {page.sidebar && <Sidebar project={project} />}
    </Grid>
  );
}

Overview.propTypes = {
  project: projectType.isRequired
};
