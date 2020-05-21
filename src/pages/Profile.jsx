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
  const { username } = useParams();
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = (username) => {
      return users.filter((user) => user.username === username)[0];
    };

    const user = getUser(username);
    if (user) setUser(user);
    setFetching(false);
  }, [username]);

  if (fetching) return <></>;

  if (!user) {
    return (
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
    );
  }

  const userInfo = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    imgSrc: user.imgSrc,
    bio: user.bio,
    link: user.link,
    username: user.username,
    followingCount: user.following.length,
    followersCount: user.followers.length,
    interested: user.interested.map(({ id, title, logo }) => ({
      id,
      title,
      logo
    }))
  };

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <UserInfo user={userInfo} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h5" gutterBottom>
            Projects
          </Typography>
          <Divider />
          <div className={classes.projects}>
            {!Boolean(
              user.contributing.length + user.createdProjects.length
            ) ? (
              <Typography>This user does not have any projects yet.</Typography>
            ) : (
              <>
                {[...user.createdProjects, ...user.contributing].map(
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
