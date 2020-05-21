import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FeedItem from '../components/FeedItem';
import ProjectCard from '../components/ProjectCard';

// mock data
const projects = [
  {
    id: '111',
    title: 'Coronavirus Testing BC',
    oneliner:
      'Some description about the project, Not the project abstract. Just one or two lines!',
    startDate: new Date(2020, 4, 1).getTime(),
    endDate: new Date(2020, 11, 31).getTime(),
    state: 'ongoing',
    logo:
      'https://i.cbc.ca/1.5492764.1586704776!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/medical-swab.jpg',
    themes: ['medicine', 'healthcare', 'politics'],
    owner: {
      id: '456',
      name: 'Alexander Bergholm'
    }
  },
  {
    id: '222',
    title: 'Kitsilano Community Engagement',
    oneliner:
      'Some description about the project, Not the project abstract. Just one or two lines!',
    startDate: new Date(2019, 10, 15).getTime(),
    endDate: new Date(2020, 3, 30).getTime(),
    state: 'completed',
    logo:
      'https://kitscc.com/wp-content/uploads/2016/07/Kitscc_CC_Colaborative_Gardens_1269.jpg',
    themes: ['environmental', 'politics'],
    owner: {
      id: '456',
      name: 'Alexander Bergholm'
    }
  }
];

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
