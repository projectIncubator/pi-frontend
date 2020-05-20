import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Link as MUILink,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';

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
      'https://i.cbc.ca/1.5492764.1586704776!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/medical-swab.jpg'
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
      'https://kitscc.com/wp-content/uploads/2016/07/Kitscc_CC_Colaborative_Gardens_1269.jpg'
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
    contributing: [],
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
    createdProjects: [projects[0]]
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
  userInfo: {
    '& > *': {
      margin: theme.spacing(1, 0)
    }
  },
  avatar: {
    margin: theme.spacing(0, 0, 2),
    padding: theme.spacing(1),
    '& > div, img, svg': {
      width: '100%',
      height: 'auto'
    }
  },
  social: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      margin: theme.spacing(0, 0, 1),
      '& > * + *': {
        margin: theme.spacing(0, 0, 0, 2)
      }
    }
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    '& > a': {
      margin: theme.spacing(0, 0, 0, 1)
    }
  },
  bio: {
    margin: theme.spacing(3, 0)
  },
  interested: {
    '& > a': {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(0, 0, 1),
      '&:hover': {
        textDecoration: 'underline'
      },
      '& > span': {
        width: '24px',
        height: '24px',
        margin: theme.spacing(0, 1, 0, 0)
      },
      '& > p': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    }
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
        <Grid className={classes.userInfo} item xs={12} md={3}>
          <Paper className={classes.avatar}>
            <Avatar alt={user.username} src={user.imgSrc} variant="square" />
          </Paper>
          <Typography variant="h5">
            {user.firstName} {user.lastName}
          </Typography>
          {user.link && (
            <div className={classes.link}>
              <LinkIcon />
              <MUILink
                href={user.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.link}
              </MUILink>
            </div>
          )}
          <div className={classes.social}>
            <div>
              <MUILink href="">
                <Box fontWeight="fontWeightBold" component="span">
                  {user.following.length}&nbsp;
                </Box>
                Following
              </MUILink>
              <MUILink href="">
                <Box fontWeight="fontWeightBold" component="span">
                  {user.followers.length}&nbsp;
                </Box>
                {user.followers.length === 1 ? 'Follower' : 'Followers'}
              </MUILink>
            </div>
            <Button>Follow</Button>
          </div>
          <div className={classes.bio}>
            <Typography>{user.bio}</Typography>
          </div>
          {Boolean(user.interested.length) && (
            <div className={classes.interested}>
              <Typography gutterBottom>Interested in projects</Typography>
              {user.interested.map((project, index) => (
                <Link key={index} to={`/project/${project.id}`}>
                  <Avatar
                    alt={project.title}
                    component="span"
                    src={project.logo}
                  />
                  <Typography>{project.title}</Typography>
                </Link>
              ))}
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h5" gutterBottom>
            Projects
          </Typography>
          <Divider />
          {!Boolean(user.contributing.length + user.createdProjects.length) ? (
            <Typography>This user does not have any projects yet.</Typography>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
