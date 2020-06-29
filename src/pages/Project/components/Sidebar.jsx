import React from 'react';
import { Grid, Hidden, makeStyles } from '@material-ui/core';
import { SidebarComponents } from './index';
import { projectType } from '../../../types';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: 'sticky',
    top: 125,
    [theme.breakpoints.down('md')]: {
      top: 50 + 42
    }
  }
}));

export default function Sidebar({ project }) {
  const classes = useStyles();
  const { sidebar_modules } = project;

  return (
    <Hidden smDown>
      <Grid item md={3}>
        <Grid container spacing={2} className={classes.sidebar}>
          {sidebar_modules.map((el, index) => {
            return (
              <Grid item xs={12} key={index}>
                <SidebarComponents component={el} project={project} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Hidden>
  );
}

Sidebar.propTypes = {
  project: projectType.isRequired
};
