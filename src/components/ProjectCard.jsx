import React from 'react';
import PropTypes from 'prop-types';
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
  projectOwner: {
    color: theme.palette.text.secondary,
    fontSize: '0.75rem'
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
    oneliner,
    startDate,
    endDate,
    state,
    logo,
    owner,
    themes,
    contributions
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
        <Typography variant="body2" className={classes.projectOwner}>
          Created by {owner.name}
        </Typography>
      </div>
      <div className={classes.themes}>
        {themes.map((theme, index) => (
          <Button
            key={title + '-' + theme}
            variant="outlined"
            color={index % 2 === 0 ? 'primary' : 'secondary'}
            size="small"
          >
            {theme}
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
  project: PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    oneliner: PropTypes.string.isRequired,
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    owner: PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    themes: PropTypes.arrayOf(PropTypes.string).isRequired,
    contributions: PropTypes.arrayOf(PropTypes.string),
    pages: PropTypes.arrayOf(PropTypes.object).isRequired,
    members: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'profile']).isRequired
};

export default ProjectCard;
