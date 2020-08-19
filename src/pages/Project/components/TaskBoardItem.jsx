import React, { useContext, useState } from 'react';
import { makeStyles, Paper, InputBase, Typography } from '@material-ui/core';
import { DialogContext, ProjectContext } from '../../../contexts';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: 38,
    width: '100%',
    padding: theme.spacing(1),
    borderRadius: 4,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  text: {
    lineHeight: 1.25,
    wordWrap: 'break-word',
    wordBreak: 'break-all'
  },

  input: {
    lineHeight: 1.25,
    wordWrap: 'break-word',
    wordBreak: 'break-all'
  },
  multiline: {
    padding: 0
  }
}));

function TaskBoardItem({
  taskId,
  index,
  isEditingHeader,
  isEditing,
  deselect
}) {
  const classes = useStyles();
  const {
    tasks: { tasks },
    setTask
  } = useContext(ProjectContext);
  const { setOpen } = useContext(DialogContext);
  const [taskText, setTaskText] = useState(tasks[taskId].text);

  const handleClick = () => {
    setTask(tasks[taskId]);
    setOpen('task');
  };

  const handleBlur = () => {
    deselect();
  };

  const handleEdit = (event) => {
    if (event.target.value.length < 200) setTaskText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') handleBlur();
  };

  return (
    <Draggable
      draggableId={taskId.toString()}
      index={index}
      isDragDisabled={!isEditing}
    >
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.paper}
          onClick={handleClick}
        >
          {isEditingHeader ? (
            <InputBase
              classes={{
                input: classes.input,
                multiline: classes.multiline
              }}
              onKeyDown={handleKeyDown}
              onChange={handleEdit}
              onBlur={handleBlur}
              value={taskText}
              fullWidth
              autoFocus
              multiline
            />
          ) : (
            <Typography variant="body1" className={classes.text}>
              {taskText}
            </Typography>
          )}
        </Paper>
      )}
    </Draggable>
  );
}

export default TaskBoardItem;
