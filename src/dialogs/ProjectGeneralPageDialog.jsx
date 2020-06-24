import React, { useState, useContext, useEffect } from 'react';
import { Dialog, Paper } from '@material-ui/core';
import { DialogContext } from '../contexts';
import DraftEditor from '../components/DraftEditor';
import { projects, getProjectIndexById } from '../mocks';

export default function ProjectGeneralPageDialog() {
  const { open, setOpen, projectId, pageIndex } = useContext(DialogContext);
  const [contentState, setContentState] = useState(false);
  const [initialContent, setInitialContent] = useState(false);

  useEffect(() => {
    if (projectId && pageIndex !== -1) {
      const index = getProjectIndexById(projectId);
      const previousContent =
        projects[index].pages[pageIndex].content.contentState;

      Boolean(previousContent)
        ? setInitialContent(JSON.parse(previousContent))
        : setInitialContent(false);
    }
  }, [open, pageIndex, projectId]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateContent = (newContent) => {
    setContentState(newContent);
  };

  const handleSave = () => {
    if (contentState) {
      const index = getProjectIndexById(projectId);
      projects[index].pages[pageIndex].content.contentState = JSON.stringify({
        ...contentState
      });
      setContentState(false);
    }

    handleClose();
  };

  return (
    <Dialog
      open={open === 'project-general'}
      onClose={handleClose}
      aria-labelledby="project-general-dialog"
      aria-describedby="project-general-dialog-description"
      maxWidth="lg"
    >
      <Paper>
        <DraftEditor
          updateContent={(newContent) => handleUpdateContent(newContent)}
          existingContent={initialContent || false}
        />
      </Paper>
      <button onClick={handleSave}>Save</button>
    </Dialog>
  );
}
