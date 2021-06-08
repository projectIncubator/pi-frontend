import React, { useContext, useState } from 'react';
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
  const { project, setProject, projectId, currentPages, currentComponents } =
    useContext(ProjectContext);
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

    setProject(projects[foundIndex]);

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
}
