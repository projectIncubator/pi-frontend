import React, { useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

import { DialogContext } from '../contexts';

export default function OverviewSettingsDialog() {
  const { open, setOpen } = useContext(DialogContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open === 'overview-settings'}
      onClose={handleClose}
      aria-labelledby="overview-settings-dialog"
      aria-describedby="overview-settings-dialog-description"
    >
      <DialogTitle id="overview-settings-dialog-title">
        {'Overview Page Settings'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="overview-settings-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
