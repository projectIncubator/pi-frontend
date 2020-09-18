import React from 'react';
import PropTypes from 'prop-types';
import { projectStubType } from '../types';
import {
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
    projectPicture: {
      width: '100%',
      backgroundImage: (props) => `url("${props.featured.cover_photo}")`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: 300,
      margin: theme.spacing(0, 0, 1)
    },
    projectHeader: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row wrap',
      alignItems: 'center',
      justifyContent: 'center',
      '& > * + *': {
        margin: theme.spacing(0, 0, 0, 1)
      }
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

function FeaturedCard({
  featured: {
    id,
    title,
    status,
    logo,
    themes,
    member_count,
    interested_count,
    oneliner,
    cover_photo
  }
}) {

  // TODO: find a better way to do this?
  const classes = useStyles({featured: {
    id,
    title,
    status,
    logo,
    themes,
    member_count,
    interested_count,
    oneliner,
    cover_photo
  }
  });

  const getProjectLink = (title) => {
    return `/project/${title.split(' ').join('-')}`;
  };

  const projectPicture = (
    <div className={classes.projectPicture}></div>
  );

  const projectTags = (
    <div className={classes.projectTags}>
      <div className={classes.themes}>
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
    </div>
  );

  // TODO: consider combining with projectTags if CSS not too complicated
  const projectHeader = (
    <div className={classes.projectHeader}>
      <Typography variant="h5" className={classes.projectName}>
        {title}
      </Typography>
      {projectTags}
    </div>
  );

  const projectMeta = (
    <div className={classes.projectMeta}>
        <Typography variant="caption" className={classes.projectStatus}>
          Status: {status}
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
  );

  const projectInfo = (
    <div>
      <Typography>{oneliner}</Typography>
    </div>
  );
  return (
    <Paper className={classes.root}>
      <>
        <div style={{ flex: 1 }}>
          <div className={classes.container}>
            {projectPicture}
            {projectHeader}
            {projectMeta}
            {projectInfo}
          </div>
        </div>
      </>
    </Paper>
  );
}

FeaturedCard.propTypes = {
  featured: PropTypes.object.isRequired
};

export default FeaturedCard;