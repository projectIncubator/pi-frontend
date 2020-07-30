/*import React, { useContext, useState } from 'react';
import {
  useMediaQuery,
  useTheme,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Tabs,
  Tab
} from '@material-ui/core';

import { useStyles } from './ProjectSettingsDialogStyles';
import { projects, getProjectIndexById } from '../../../mocks';
import { DialogContext, ProjectContext } from '../../../contexts';
import ProjectSettingsGeneral from './ProjectSettingsGeneral';
import ProjectSettingsPages from './ProjectSettingsPages';
import ProjectSettingsSidebar from './ProjectSettingsSidebar';

export default function ProjectSettingsDialog() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { open, setOpen } = useContext(DialogContext);
  const { project, projectId, currentPages, currentComponents } = useContext(
    ProjectContext
  );
  const [tabValue, setTabValue] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabs = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    const foundIndex = getProjectIndexById(projectId);

    const cleanPagesOrder = () => {
      return currentPages.map((el) => ({
        type: el.type,
        id: el.id,
        showing: el.showing,
        sidebar: el.sidebar,
        title: el.title
      }));
    };

    const cleanSidebarModules = () => {
      return currentComponents.map((el) => ({
        type: el.type,
        content: el.content,
        id: el.id
      }));
    };

    const newPagesOrder = cleanPagesOrder();
    const newSidebarModules = cleanSidebarModules();
    const newPagesModules = { ...project.pages_modules.pages };
    currentPages.forEach((el) => {
      if (!Object.keys(newPagesModules).includes(el.id)) {
        newPagesModules[el.id] = {
          type: el.type,
          content: el.content
        };
      }
    });

    projects[foundIndex].meta.pages_order = newPagesOrder;
    projects[foundIndex].sidebar_modules = newSidebarModules;
    projects[foundIndex].pages_modules.pages = newPagesModules;

    setOpen(false);
  };

  const renderContent = (tabIndex) => {
    if (tabIndex === 0) {
      return <ProjectSettingsGeneral />;
    } else if (tabIndex === 1) {
      return <ProjectSettingsPages />;
    } else if (tabIndex === 2) {
      return <></>;
    } else if (tabIndex === 3) {
      return <></>;
    } else if (tabIndex === 4) {
      return <ProjectSettingsSidebar />;
    }
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
      <Paper className={classes.headerPaper}>
        <Tabs
          value={tabValue}
          onChange={handleTabs}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General" />
          <Tab label="Pages" />
          <Tab label="Members" />
          <Tab label="Positions" />
          <Tab label="Sidebar" />
        </Tabs>
      </Paper>
      <DialogContent className={classes.dialogContent}>
        {renderContent(tabValue)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}*/


import React, { useContext, useState, useEffect } from 'react';
import {
  useMediaQuery,
  useTheme,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
  }

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
    setUserCopy({ ...userCopy, [e.target.name]: e.target.value })
  }
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
        <DialogContentText>
          Update user
          </DialogContentText>
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
          dropzoneText={'Update your profile photo by dragging and dropping an image here or clicking'}
          filesLimit={1}
          maxFileSize={5000000}
        // onChange={(files) => console.log('Files:', files)}
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