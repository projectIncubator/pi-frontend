import React, { useContext, useState, useEffect } from 'react';
import {
  useMediaQuery,
  useTheme,
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { DialogContext, AuthContext } from '../../../contexts';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ProjectSettingsDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { open, setOpen } = useContext(DialogContext);
  const { user } = useContext(AuthContext);
  const [userCopy, setUserCopy] = useState();

  const handleFillin = () => {
    setUserCopy(user);
  };

  useEffect(() => {
    if (user != undefined) {
      handleFillin();
    }
  }, [user]);

  const handleClose = () => {
    handleFillin();
    setOpen(false);
  };

  const handleChange = (e) => {
    setUserCopy({ ...userCopy, [e.target.name]: e.target.value });
  };
  //TODO: Call the backend api to send the userCopy object into the backend;
  const handleSave = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open === 'project-settings'}
      onClose={handleClose}
      aria-labelledby="project-settings-dialog"
      aria-describedby="project-settings-dialog-description"
      maxWidth="lg"
    >
      <DialogTitle id="form-dialog-title">User Update</DialogTitle>
      <DialogContent>
        <DialogContentText>Update user</DialogContentText>
        <TextField
          //defaultValue = {user.first_name}
          autoFocus
          margin="dense"
          id="first name"
          label="First Name"
          type="first name"
          fullWidth
          name="first_name"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          // defaultValue = {user.last_name}
          autoFocus
          margin="dense"
          name="last_name"
          label="Last Name"
          type="last name"
          fullWidth
          onChange={(e) => handleChange(e)}
        />
        <TextField
          // defaultValue = {user.email}
          autoFocus
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          onChange={(e) => handleChange(e)}
        />
        <TextField
          // defaultValue = {user.profile_id}
          autoFocus
          margin="dense"
          name="profile_id"
          label="Profile_ID"
          type="profile_id"
          fullWidth
          onChange={(e) => handleChange(e)}
        />
        <TextField
          // defaultValue = {user.bio}
          autoFocus
          margin="dense"
          name="bio"
          label="Bio"
          type="bio"
          fullWidth
          onChange={(e) => handleChange(e)}
        />
        <TextField
          // defaultValue = {user.link}
          autoFocus
          margin="dense"
          name="link"
          label="Link"
          type="link"
          fullWidth
          onChange={(e) => handleChange(e)}
        />
        <DropzoneArea
          acceptedFiles={['image/png', 'image/jpg', 'image/jpeg']}
          dropzoneText={
            'Update your profile photo by dragging and dropping an image here or clicking'
          }
          filesLimit={1}
          maxFileSize={5000000}
          //onChange={(files) => console.log('Files:', files)}
          //onChange={(files) => handleUpload(files)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
