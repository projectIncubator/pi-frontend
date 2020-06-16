import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import {
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';
import UserInfo from '../components/UserInfo';
import ProjectCard from '../components/ProjectCard';
import { users } from '../mocks';

const styles = (theme) => ({
  root: {
    minHeight: '100%',
    padding: theme.spacing(3),
    borderTop: 'none'
  },
  notfound: {
    height: '100%',
    '& > div': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(0, 0, 20)
    }
  },
  projects: {
    margin: theme.spacing(1, 0)
  }
});

function Profile({ classes }) {
  const { profileId } = useParams();
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = (profileId) => {
      return users.find((user) => user.profile_id === profileId);
    };

    const user = getUser(profileId);
    if (user) setUser(user);
    setFetching(false);
  }, [profileId]);

  if (fetching) return <></>;

  return !user ? (
    <Paper className={clsx(classes.root, classes.notfound)}>
      <div>
        <Typography variant="h5" gutterBottom>
          Sorry, the profile you are looking for could not be found.
        </Typography>
        <Link to="/dashboard">
          <Button>GO HOME</Button>
        </Link>
      </div>
    </Paper>
  ) : (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <UserInfo user={user} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h5" gutterBottom>
            Projects
          </Typography>
          <Divider />
          <div className={classes.projects}>
            {!Boolean(
              user.contributing.length + user.created_projects.length
            ) ? (
              <Typography>This user does not have any projects yet.</Typography>
            ) : (
              <>
                {[...user.created_projects, ...user.contributing].map(
                  (project, index) => (
                    <ProjectCard
                      key={index}
                      project={project}
                      variant="profile"
                    />
                  )
                )}
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
