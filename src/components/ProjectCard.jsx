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
    padding: theme.spacing(1, 1)
  },
  icon: {
    paddingRight: theme.spacing(2),
    display: 'flex',
    alignSelf: 'flex-start'
  },
  projectHeader: {
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
  projectMeta: {
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    '& > * + *': {
      margin: theme.spacing(0, 0, 0, 1)
    }
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
    flexFlow: 'row wrap',
    justifyContent: 'space-between'
  }
}));

function ProjectCard({
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
  },
  variant
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

  const projectThemes = (
    <div className={classes.themes}>
      {themes.map((theme, index) => (
        <Button
          key={theme.name}
          variant="outlined"
          color={index % 2 === 0 ? 'primary' : 'secondary'}
          size="small"
        >
          {theme.name}
        </Button>
      ))}
    </div>
  );

  const projectHeader = (
    <div className={classes.projectHeader}>
      <Typography variant="h6" className={classes.projectName}>
        <Link to={getProjectLink(title)}>{title}</Link>
      </Typography>
      <div className={classes.projectMeta}>
        <Typography variant="caption" component="span">
          {member_count} contributing
        </Typography>
        <div className={classes.separator} />
        <Typography variant="caption" component="span">
          {interested_count} interested
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
      {variant === 'profile' ? (
        <>
          {projectLogo}
          <div>
            <div className={classes.container}>
              {projectHeader}
              {projectThemes}
            </div>
            {projectInfo}
          </div>
        </>
      ) : (
        <>
          {projectLogo}
          {projectHeader}
          {projectThemes}
        </>
      )}
    </Paper>
  );
}

ProjectCard.defaultProps = {
  variant: 'default'
};

ProjectCard.propTypes = {
  project: projectStubType.isRequired,
  variant: PropTypes.oneOf(['default', 'profile']).isRequired
};

export default ProjectCard;
