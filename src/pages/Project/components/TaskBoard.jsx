import React, { useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ProjectContext } from '../../../contexts';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'lightgrey',
    borderRadius: 5,
    padding: theme.spacing(3),
    border: 'none'
  }
}));

function TaskBoard() {
  const classes = useStyles();
  const {
    project: { tasks }
  } = useContext(ProjectContext);
  const tasksArray = Object.keys(tasks);

  console.log(tasks);

  return (
    <Paper className={classes.root} elevation={0}>
      <DragDropContext></DragDropContext>
    </Paper>
  );
}

export default TaskBoard;
