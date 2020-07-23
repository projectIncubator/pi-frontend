import React from 'react';
import ProjectSettingsDialog from './ProjectSettingsDialog';
import GeneralPageDialog from './GeneralPageDialog';
import OverviewPageDialog from './OverviewPageDialog';

export default function ProjectDialogs() {
  return (
    <>
      <ProjectSettingsDialog />
      <GeneralPageDialog />
      <OverviewPageDialog />
    </>
  );
}
