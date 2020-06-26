import React, { useState, useContext, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Paper,
  Button
} from '@material-ui/core';
import { DialogContext } from '../contexts';
import DraftEditor from '../components/DraftEditor';
import { projects, getProjectIndexById } from '../mocks';

export default function ProjectGeneralPageDialog() {
  const { open, setOpen, projectId, pageIndex } = useContext(DialogContext);
  const [contentState, setContentState] = useState(false);
  const [initialContent, setInitialContent] = useState(false);
  const [page, setPage] = useState({});

  useEffect(() => {
    if (projectId && pageIndex !== -1) {
      const index = getProjectIndexById(projectId);
      setPage(projects[index].pages[pageIndex]);
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
      <DialogTitle id="project-general-dialog">
        {Object.keys(page).length !== 0 && page.content.title}
      </DialogTitle>
      <DialogContent style={{ paddingTop: 0 }}>
        <Paper>
          <DraftEditor
            updateContent={(newContent) => handleUpdateContent(newContent)}
            existingContent={initialContent || false}
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
