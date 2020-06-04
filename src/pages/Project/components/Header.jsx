import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex'
  },
  title: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    marginRight: theme.spacing(2)
  },
  chip: {
    textTransform: 'capitalize'
  }
}));

export default function Header({ title, status, isAdmin, divider }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.header}>
        <div className={classes.title}>
          <Typography variant="h4" className={classes.text} gutterBottom>
            {title}
          </Typography>
          {status && (
            <Chip
              label={status}
              size="small"
              color="primary"
              variant="outlined"
              className={classes.chip}
            />
          )}
        </div>
        {isAdmin && (
          <IconButton>
            <SettingsIcon />
          </IconButton>
        )}
      </div>
      {divider && <Divider />}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string,
  isAdmin: PropTypes.bool,
  divider: PropTypes.bool
};
