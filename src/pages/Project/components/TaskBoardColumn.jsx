import React, { useContext } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { makeStyles, Typography } from '@material-ui/core';

import { ProjectContext } from '../../../contexts';
import { TaskBoardItem } from './index';

const useStyles = makeStyles((theme) => ({
  column: {
    background: theme.palette.background.paper,
    padding: theme.spacing(1),
    minWidth: 260,
    borderRadius: 4
  },
  columnHeader: {},
  droppableGrid: {
    borderRadius: 4,
    minHeight: 1,
    '& > div': {
      marginBottom: theme.spacing(1)
    }
  },
  new: {
    padding: theme.spacing(1),
    cursor: 'pointer',
    borderRadius: 4,
    '&:hover': {
      background: '#efefef'
    }
  }
}));

const getDroppableStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightgrey' : ''
});

function TaskBoardColumn({ statusId, index }) {
  const classes = useStyles();
  const {
    project: {
      tasks: { statuses, lastTaskId }
    },
    setProject
  } = useContext(ProjectContext);
  const { title, tasks } = statuses[statusId];

  const handleNewTask = () => {
    const newStatusTasks = [...tasks];
    const newTaskId = lastTaskId + 1;
    newStatusTasks.push(newTaskId);
    const newTask = {
      text: 'Text goes here',
      id: newTaskId,
      milestone: null,
      subtasks: [],
      members: [],
      status: title,
      createdDate: new Date()
    };

    setProject((project) => ({
      ...project,
      tasks: {
        ...project.tasks,
        lastTaskId: lastTaskId + 1,
        tasks: {
          ...project.tasks.tasks,
          [newTaskId]: newTask
        },
        statuses: {
          ...project.tasks.statuses,
          [statusId]: {
            ...project.tasks.statuses[statusId],
            tasks: newStatusTasks
          }
        }
      }
    }));
  };

  return (
    <Draggable draggableId={statusId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={classes.column}
        >
          <div {...provided.dragHandleProps} className={classes.columnHeader}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
          </div>
          <Droppable droppableId={statusId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={classes.droppableGrid}
                style={getDroppableStyle(snapshot.isDraggingOver)}
              >
                {tasks.map((taskId, taskIndex) => (
                  <TaskBoardItem
                    key={taskId}
                    taskId={taskId}
                    index={taskIndex}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className={classes.new} onClick={handleNewTask}>
            + Add new task
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskBoardColumn;
