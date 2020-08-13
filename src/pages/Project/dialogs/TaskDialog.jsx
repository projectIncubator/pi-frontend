import React, { useContext, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Paper,
  Grid,
  Divider,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';

import { DialogContext, ProjectContext } from '../../../contexts';
import timeSince from '../../../utils/timeSince';
import { useStyles } from './TaskDialogStyles';

function TaskDialog() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { task, setTask } = useContext(ProjectContext);
  const { open, setOpen } = useContext(DialogContext);

  const handleClose = () => {
    setTask({});
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open === 'task'}
      onClose={handleClose}
      aria-labelledby="task-dialog"
      aria-describedby="task-dialog-description"
      maxWidth="lg"
      classes={{ paper: classes.paper }}
    >
      <div className={classes.sidebar}>
        <Typography variant="h6">Members</Typography>
      </div>
      <div className={classes.mainbar}>
        <Typography variant="h5" gutterBottom>
          Overview Page Settings
        </Typography>
        <Divider style={{ marginBottom: 8 }} />
        <div className={classes.mainbarContent}>
          <div className={classes.description}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <div className={classes.descriptionContent}>
              <Typography variant="body1">{task.description}</Typography>
            </div>
          </div>
          <div className={classes.comments}>
            <Typography variant="h6" gutterBottom>
              Comments
            </Typography>
            {task.comments &&
              task.comments.map((comment, index) => (
                <div key={index}>
                  <div className={classes.commentHeader}>
                    <Avatar
                      alt={comment.user.nickname}
                      src="/static/images/avatar/3.jpg"
                      className={classes.commentAvatar}
                    />
                    <Typography variant="body1" className={classes.commentUser}>
                      {comment.user.nickname}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      className={classes.commentDate}
                    >
                      {timeSince(comment.createdDate)}
                    </Typography>
                  </div>
                  <Paper className={classes.commentContent}>
                    <Typography>{comment.text}</Typography>
                  </Paper>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className={classes.closeButton} onClick={handleClose}>
        X
      </div>
    </Dialog>
  );
}

export default TaskDialog;
