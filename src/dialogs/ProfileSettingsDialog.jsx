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
import { DialogContext, AuthContext } from '../contexts';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ProfileSettingsDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { open, setOpen } = useContext(DialogContext);
  const { user, setUser, authenticatedFetch } = useContext(AuthContext);
  const [userCopy, setUserCopy] = useState();

  const handleFillin = () => {
    setUserCopy(user);
  };

  useEffect(() => {
    if (user !== undefined) {
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
  const handleSave = async () => {
    try {
      const sendUser = {
        first_name: userCopy.first_name,
        last_name: userCopy.last_name,
        profile_id: userCopy.profile_id,
        image: userCopy.image,
        bio: userCopy.bio
      };

      await authenticatedFetch('users/profile', {
        method: 'PATCH',
        body: sendUser
      });

      setUser(userCopy);
      setOpen(false);
    } catch (e) {
      //TODO handle unique key error (helper text)
      //TODO variant = outline
      //TODO url change
      //TODO default
      console.log('ERROR:', e);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open === 'profile-settings'}
      onClose={handleClose}
      aria-labelledby="profile-settings-dialog"
      aria-describedby="profile-settings-dialog-description"
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
          value={userCopy ? userCopy.first_name : 'First Name'}
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
          // defaultValue = {user.profile_id}
          autoFocus
          margin="dense"
          name="profile_id"
          label="URL"
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
