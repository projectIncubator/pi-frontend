import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Divider,
  Typography,
  Chip,
  IconButton
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { DialogContext } from '../../../contexts';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    marginBottom: theme.spacing(2)
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

export default function Header({ title, status, isAdmin, divider, page }) {
  const classes = useStyles();
  const { setOpen } = useContext(DialogContext);

  return (
    <>
      <div className={classes.header}>
        <div className={classes.title}>
          <Typography variant="h4" className={classes.text}>
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
          <IconButton onClick={() => setOpen(`project-${page}`)}>
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
