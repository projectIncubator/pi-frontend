import React from 'react';
import PropTypes from 'prop-types';
import { projectStubType } from '../types';
import { Button, Paper, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PetsIcon from '@material-ui/icons/Pets';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(0, 0, 1),
    padding: theme.spacing(1, 2)
  },
  icon: {
    paddingRight: theme.spacing(2),
    display: 'flex'
  },
  projectHeader: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  projectName: {
    lineHeight: 1.2,
    fontWeight: 400,
    fontSize: '1.25rem'
  },
  projectDetails: {
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
    '& > *': {
      marginLeft: theme.spacing(1)
    }
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

  return (
    <Paper className={classes.root}>
      <div className={classes.icon}>
        <PetsIcon color="inherit" />
      </div>
      <div className={classes.projectHeader}>
        <Typography variant="h6" className={classes.projectName}>
          <Link to={'project/' + title.split(' ').join('-')}>{title}</Link>
        </Typography>
        <div className={classes.projectDetails}>
          <Typography variant="caption" component="span">
            {member_count} contributing
          </Typography>
          <div className={classes.separator} />
          <Typography variant="caption" component="span">
            {interested_count} interested
          </Typography>
        </div>
      </div>
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
