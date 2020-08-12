import React, { useContext } from 'react';
import { Paper } from '@material-ui/core';
import { ProjectContext } from '../../../contexts';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    padding: theme.spacing(1),
    borderRadius: 4
  }
}));

function TaskBoardItem({ taskId, index }) {
  const classes = useStyles();
  const {
    project: {
      tasks: { tasks }
    }
  } = useContext(ProjectContext);

  return (
    <Draggable draggableId={taskId.toString()} index={index}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.paper}
        >
          {tasks[taskId].text}
        </Paper>
      )}
    </Draggable>
  );
}

export default TaskBoardItem;
