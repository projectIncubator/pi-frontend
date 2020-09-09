import React from 'react';
import PropTypes from 'prop-types';
import { projectStubType } from '../types';
import {
  Avatar,
  Button,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: theme.spacing(0, 0, 1),
      padding: theme.spacing(1, 1),
      borderWidth: 'medium',
      borderColor: 'green',
      borderRadius: '1em'
    },
    icon: {
      paddingRight: theme.spacing(2),
      display: 'flex',
      alignSelf: 'flex-start'
    },
    projectHeader: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: theme.spacing(0, 0, 0.5)
    },
    projectName: {
      lineHeight: 1.2,
      fontWeight: 400,
      fontSize: '1.25rem'
    },
    projectTags: {
      flex: 1,
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between'
    },
    projectMeta: {
      color: theme.palette.text.secondary,
      display: 'flex',
      alignItems: 'center',
      '& > * + *': {
        margin: theme.spacing(0, 0, 0, 1)
      }
    },
    projectStatus: {
      textTransform: 'capitalize',
      display: 'inline'
    },
    separator: {
      width: 3,
      height: 3,
      display: 'inline-block',
      backgroundColor: theme.palette.text.secondary,
      borderRadius: '50%'
    },
    themes: {
      margin: theme.spacing(0, 0, 0.5),
      '& > * + *': {
        marginLeft: theme.spacing(1)
      }
    },
    container: {
      display: 'flex',
      flexFlow: 'column wrap',
      justifyContent: 'space-between'
    }
  }));

function ExploreCard({
  project: {
    id,
    title,
    status,
    logo,
    themes,
    member_count,
    interested_count,
    start_date,
    end_date,
    oneliner
  }
}) {

  const classes = useStyles();

  const getProjectLink = (title) => {
    return `/project/${title.split(' ').join('-')}`;
  };

  const projectLogo = (
    <div className={classes.icon}>
      <Avatar alt={title} src={logo} /> 
    </div>
  );

  const projectTags = (
    <div className={classes.projectTags}>
      <div className={classes.themes}>
        <Typography variant="caption" component="span">Tags: </Typography>
        {themes.map((theme, index) => (
          <Button
            key={theme.name}
            variant="outlined"
            color={index % 2 === 0? 'primary' : 'secondary'}
            size="small"
          >
            {theme.name}
          </Button>
        ))}
      </div>
      <Button
        key={title}
        variant="contained"
        color="primary"
        size="small"
        to={getProjectLink(title)}
      >
        Go to Project
      </Button>
    </div>
  );

  const projectHeader = (
    <div className={classes.projectHeader}>
      <Typography variant="h6" className={classes.projectName}>
        {title}
      </Typography>
      <div className={classes.projectMeta}>
        {/* TODO: figure out formatting for lines here */}
        <Typography variant="caption" className={classes.projectStatus}>
          {status} - {end_date.slice(0, 10)}
        </Typography>
        <div className={classes.separator} />
        <Typography variant="caption" component="span">
          {interested_count} interested
        </Typography>
        <div className={classes.separator} />
        <Typography variant="caption" component="span">
          {member_count} contributors
        </Typography>
      </div>
    </div>
  );

  const projectInfo = (
    <div>
      <Typography>{oneliner}</Typography>
    </div>
  );

  return (
    <Paper className={classes.root}>
      <>
        {projectLogo}
        <div style={{ flex: 1 }}>
          <div className={classes.container}>
            {projectHeader}
            {projectTags}
            {projectInfo}
          </div>
        </div>
      </>
    </Paper>
  );
}

ExploreCard.propTypes = {
  project: projectStubType.isRequired
};

export default ExploreCard;