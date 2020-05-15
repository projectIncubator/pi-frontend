import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PetsIcon from '@material-ui/icons/Pets';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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

function ProjectCard(props) {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <div className={classes.icon}>
        <PetsIcon color="inherit" />
      </div>
      <div className={classes.projectHeader}>
        <Typography variant="h6" className={classes.projectName}>
          {props.project}
        </Typography>
        <Typography variant="body2" className={classes.projectOwner}>
          Created by {props.owner}
        </Typography>
      </div>
      <div className={classes.themes}>
        {props.themes.map((theme, index) => (
          <Button
            key={props.project + '-' + theme}
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

export default ProjectCard;
