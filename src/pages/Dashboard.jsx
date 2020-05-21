import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FeedItem from '../components/FeedItem';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../mocks';

const useStyles = makeStyles((theme) => ({
  content: {
    borderTop: 'none',
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  header: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <Paper className={classes.content}>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Typography variant="h5" className={classes.header}>
            Current Projects
          </Typography>
          {projects.map((item, index) => (
            <ProjectCard key={index} project={item} />
          ))}
        </Grid>
        <Grid item lg={6} xs={12}>
          <Typography variant="h5" className={classes.header}>
            Followed Projects
          </Typography>
          {projects.map((item, index) => (
            <ProjectCard key={index} project={item} />
          ))}
        </Grid>
      </Grid>

      <Typography variant="h5" className={classes.header}>
        My Feed
      </Typography>

      {[
        'Water Pollution BC',
        'Cakes Are Awesome',
        'Greenhouse Gasses Begone'
      ].map((project) => (
        <FeedItem
          key={'feed-' + project}
          project={project}
          updateType="has a new update"
          content={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet felis at justo luctus tempor. Nam id ligula eu nisl tempor molestie. In tellus.'
          }
        />
      ))}
    </Paper>
  );
}

export default Dashboard;
