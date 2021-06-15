import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { userType } from '../types';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link as MUILink,
  Paper,
  Typography,
  useMediaQuery,
  withStyles
} from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';
import { useAuth0 } from '../contexts/AuthProvider';
import { DialogContext } from '../contexts';

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1, 0)
    }
  },
  avatar: {
    '& > div, img, svg': {
      width: '100%',
      height: 'auto'
    }
  },
  basicInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 0, 0, 1)
  },
  link: {
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    '& > a': {
      margin: theme.spacing(0, 0, 0, 1)
    }
  },
  social: {
    '& > div': {
      marginBottom: theme.spacing(0.5)
    }
  },
  bio: {
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(3, 0)
    }
  },
  interested: {
    '& > p': {
      fontWeight: theme.typography.fontWeightMedium
    },
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
      }
    }
  },
  ellipsis: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
});

const UserInfo = ({
  classes,
  user: {
    id,
    first_name,
    last_name,
    image,
    profile_id,
    email,
    bio,
    link,
    following_count,
    followers_count,
    interested,
    contributing,
    created_projects
  }
}) => {
  const { user, setUser, authenticatedFetch } = useAuth0();
  const { setOpen } = useContext(DialogContext);

  const [isFollowing, setIsFollowing] = useState(
    () =>
      user &&
      id !== user.id &&
      user.following.map((u) => u.id === id).includes(true)
  );
  const [followersCount, setFollowersCount] = useState(followers_count);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const followUser = async () => {
    try {
      const response = await authenticatedFetch('follows/' + id, {
        method: 'POST'
      });

      const newFollowing = [...user.following].concat([response]);
      setUser({ ...user, following: newFollowing });
      setIsFollowing(!isFollowing);
      setFollowersCount(followersCount + 1);
    } catch (e) {
      console.log('ERROR:', e);
    }
  };

  const unfollowUser = async () => {
    try {
      await authenticatedFetch('follows/' + id, { method: 'DELETE' });
      const newFollowings = [...user.following].filter((u) => u.id !== id);
      setUser({ ...user, following: newFollowings });
      setIsFollowing(!isFollowing);
      setFollowersCount(followersCount - 1);
    } catch (e) {
      console.log('ERROR: ', e);
    }
  };

  const avatarSection = (
    <section>
      <Paper className={classes.avatar}>
        <Avatar alt={profile_id} src={image} variant="square" />
      </Paper>
    </section>
  );

  const identitySection = (
    <section>
      <Typography variant="h5">
        {first_name} {last_name}
      </Typography>
      {Boolean(link) && (
        <div className={classes.link}>
          <LinkIcon />
          <MUILink
            className={classes.ellipsis}
            color="textSecondary"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </MUILink>
        </div>
      )}
    </section>
  );

  const followButton =
    user &&
    (id !== user.id ? (
      isFollowing ? (
        <Button
          fullWidth
          size={isMobile ? 'small' : 'medium'}
          onClick={unfollowUser}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          fullWidth
          size={isMobile ? 'small' : 'medium'}
          onClick={followUser}
        >
          Follow
        </Button>
      )
    ) : (
      <Button
        fullWidth
        size={isMobile ? 'small' : 'medium'}
        onClick={() => {
          setOpen('profile-settings');
        }}
      >
        Edit Profile
      </Button>
    ));

  const socialSection = (
    <section className={classes.social}>
      <Grid container>
        <Grid item xs={6}>
          <MUILink href="">
            <Box fontWeight="fontWeightBold" component="span">
              {followersCount}&nbsp;
            </Box>
            {followersCount === 1 ? 'Follower' : 'Followers'}
          </MUILink>
        </Grid>
        <Grid item xs={6}>
          <MUILink href="">
            <Box fontWeight="fontWeightBold" component="span">
              {following_count}&nbsp;
            </Box>
            Following
          </MUILink>
        </Grid>
      </Grid>
      {followButton}
    </section>
  );

  const bioSection = (
    <section className={classes.bio}>
      <Typography>{bio}</Typography>
    </section>
  );

  const interestedSection = Boolean(interested.length) && (
    <section className={classes.interested}>
      <Typography gutterBottom>Interested in projects</Typography>
      {interested.map((project, index) => (
        <Link key={index} to={`/project/${project.id}`}>
          <Avatar alt={project.title} component="span" src={project.logo} />
          <Typography className={classes.ellipsis}>{project.title}</Typography>
        </Link>
      ))}
    </section>
  );

  return (
    <div className={classes.root}>
      {isMobile ? (
        <>
          <Grid container>
            <Grid item xs={4}>
              {avatarSection}
            </Grid>
            <Grid className={classes.basicInfoContainer} item xs={8}>
              {identitySection}
              {socialSection}
            </Grid>
          </Grid>
          {bioSection}
          {interestedSection}
        </>
      ) : (
        <>
          {avatarSection}
          {identitySection}
          {socialSection}
          {bioSection}
          {interestedSection}
        </>
      )}
    </div>
  );
};

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  user: userType.isRequired
};

export default withStyles(styles)(UserInfo);
