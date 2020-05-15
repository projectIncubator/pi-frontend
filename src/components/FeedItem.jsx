import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  accountIcon: {
    paddingRight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),

    textAlign: 'left',
    color: theme.palette.text.primary
  },
  bold: {
    fontWeight: 'bold'
  }
}));

function FeedItem(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.accountIcon}>
        <AccountCircleIcon fontSize="large" />
      </div>
      <Paper variant="outlined" className={classes.content}>
        <Typography variant="body1" className={classes.header}>
          <span className={classes.bold}>{props.project + ' '}</span>
          {props.updateType}:
        </Typography>
        {props.content}
      </Paper>
    </div>
  );
}

export default FeedItem;
