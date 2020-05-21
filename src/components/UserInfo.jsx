import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Link as MUILink,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';

const styles = (theme) => ({
  root: {
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
      }
    }
  },
  ellipsis: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
});

function UserInfo({
  classes,
  user: {
    id,
    firstName,
    lastName,
    imgSrc,
    bio,
    link,
    username,
    followingCount,
    followersCount,
    interested
  }
}) {
  return (
    <div className={classes.root}>
      <Paper className={classes.avatar}>
        <Avatar alt={username} src={imgSrc} variant="square" />
      </Paper>
      <Typography variant="h5">
        {firstName} {lastName}
      </Typography>
      {link && (
        <div className={classes.link}>
          <LinkIcon />
          <MUILink
            className={classes.ellipsis}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </MUILink>
        </div>
      )}
      <div className={classes.social}>
        <div>
          <MUILink href="">
            <Box fontWeight="fontWeightBold" component="span">
              {followingCount}&nbsp;
            </Box>
            Following
          </MUILink>
          <MUILink href="">
            <Box fontWeight="fontWeightBold" component="span">
              {followersCount}&nbsp;
            </Box>
            {followersCount === 1 ? 'Follower' : 'Followers'}
          </MUILink>
        </div>
        <Button>Follow</Button>
      </div>
      <div className={classes.bio}>
        <Typography>{bio}</Typography>
      </div>
      {Boolean(interested.length) && (
        <div className={classes.interested}>
          <Typography gutterBottom>Interested in projects</Typography>
          {interested.map((project, index) => (
            <Link key={index} to={`/project/${project.id}`}>
              <Avatar alt={project.title} component="span" src={project.logo} />
              <Typography className={classes.ellipsis}>
                {project.title}
              </Typography>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.exact({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    followingCount: PropTypes.number.isRequired,
    followersCount: PropTypes.number.isRequired,
    interested: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default withStyles(styles)(UserInfo);
