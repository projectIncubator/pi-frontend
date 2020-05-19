import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FeedItem from '../components/FeedItem';
import ProjectCard from '../components/ProjectCard';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  content: {
    borderTop: 'none',
    height: '100%',
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
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.content} square>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <Typography variant="h5" className={classes.header}>
              Current Projects
            </Typography>
            {[
              {
                project: 'Coronavirus Testing BC',
                owner: 'Alexander Bergholm',
                themes: ['medicine', 'healthcare', 'politics']
              },
              {
                project: 'Water Pollution BC',
                owner: 'World Health Organization',
                themes: ['environmental', 'politics']
              }
            ].map((item) => (
              <ProjectCard
                key={item.project}
                project={item.project}
                owner={item.owner}
                themes={item.themes}
              />
            ))}
          </Grid>
          <Grid item lg={6} xs={12}>
            <Typography variant="h5" className={classes.header}>
              Followed Projects
            </Typography>
            {[
              {
                project: 'Coronavirus Testing BC',
                owner: 'Alexander Bergholm',
                themes: ['medicine', 'healthcare', 'politics']
              },
              {
                project: 'Water Pollution BC',
                owner: 'World Health Organization',
                themes: ['environmental', 'politics']
              }
            ].map((item) => (
              <ProjectCard
                key={item.project}
                project={item.project}
                owner={item.owner}
                themes={item.themes}
              />
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
    </div>
  );
}

export default Dashboard;
