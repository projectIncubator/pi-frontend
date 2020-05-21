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

const users = [
  {
    id: '123',
    firstName: 'Kenrick',
    lastName: 'Yap',
    imgSrc:
      'https://media-exp1.licdn.com/dms/image/C4D03AQErND9yV4YlOQ/profile-displayphoto-shrink_400_400/0?e=1595462400&v=beta&t=_UMhkaYPkMSudY_KfrkFos0XnCEAYRPK3vBftoOwmHs',
    bio: 'Student at The University of British Columbia',
    link: 'https://github.com/14yapkc1',
    username: '14yapkc1',
    following: ['456', '789'],
    followers: ['456'],
    interested: [projects[0], projects[1]],
    contributing: [projects[1]],
    createdProjects: []
  },
  {
    id: '456',
    firstName: 'Alexander',
    lastName: 'Bergholm',
    imgSrc:
      'https://media-exp1.licdn.com/dms/image/C4D03AQGs85aYF34VTw/profile-displayphoto-shrink_400_400/0?e=1595462400&v=beta&t=XlhgJCJ2zmKVK59QYuVvm4BRRZTX1rJUrsyT6NFOonU',
    bio:
      'Machine Learning enthusiast, applied in a Medical and Healthcare environment',
    link: '',
    username: 'bergholma',
    following: ['123', '789'],
    followers: ['123'],
    interested: [],
    contributing: [],
    createdProjects: [projects[0], projects[1]]
  },
  {
    id: '789',
    firstName: 'Hal',
    lastName: 'Shin',
    imgSrc: '',
    bio: 'Professional Bombergrounds Player 3k ELO',
    link: 'https://twitch.tv/thewarriorofblue',
    username: 'communitybicycle',
    following: [],
    followers: ['123', '456'],
    interested: [],
    contributing: [projects[0]],
    createdProjects: []
  }
];

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
