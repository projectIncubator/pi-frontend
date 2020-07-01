import React, { useState, useContext, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Paper,
  Button
} from '@material-ui/core';
import { DialogContext, ProjectContext } from '../../../contexts';
import DraftEditor from '../../../components/DraftEditor';
import { projects, getProjectIndexById } from '../../../mocks';

export default function GeneralPageDialog() {
  const { open, setOpen } = useContext(DialogContext);
  const [contentState, setContentState] = useState(false);
  const [initialContent, setInitialContent] = useState(false);
  const { page, projectId } = useContext(ProjectContext);

  useEffect(() => {
    if (projectId && Boolean(page.meta.id)) {
      const previousContent = page.content.contentState;

      Object.keys(previousContent).length > 0
        ? setInitialContent(JSON.parse(previousContent))
        : setInitialContent(false);
    }
  }, [open, projectId, page.content.contentState, page.meta.id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateContent = (newContent) => {
    setContentState(newContent);
  };

  const handleSave = () => {
    if (contentState) {
      const index = getProjectIndexById(projectId);
      projects[index].pages_modules.pages[
        page.meta.id
      ].content.contentState = JSON.stringify({
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
        {Object.keys(page).length !== 0 && page.meta.title}
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
