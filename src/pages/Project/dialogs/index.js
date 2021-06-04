import React from 'react';
import ProjectSettingsDialog from './ProjectSettingsDialog';
import GeneralPageDialog from './GeneralPageDialog';
import OverviewPageDialog from './OverviewPageDialog';
import TaskDialog from './TaskDialog';

export default function ProjectDialogs() {
  return (
    <>
      <ProjectSettingsDialog />
      <GeneralPageDialog />
      <OverviewPageDialog />
      <TaskDialog />
    </>
  );
}