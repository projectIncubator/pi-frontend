import React, { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { makeStyles, Paper } from '@material-ui/core';

import { ProjectContext } from '../../../contexts';
import { TaskBoardColumn } from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1.5),
    background: 'lightgrey',
    borderRadius: 5,
    padding: theme.spacing(3),
    border: 'none',
    overflowX: 'scroll'
  },
  columnContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    '& > div': {
      marginRight: theme.spacing(2)
    }
  }
}));

const getDroppableStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'darkgrey' : ''
});

function TaskBoard() {
  const classes = useStyles();
  const {
    project: {
      tasks: { statusOrder, statuses }
    },
    setProject
  } = useContext(ProjectContext);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    // Moving collections
    if (type === 'column') {
      const newStatusOrder = [...statusOrder];
      newStatusOrder.splice(source.index, 1);
      newStatusOrder.splice(destination.index, 0, draggableId);

      setProject((project) => ({
        ...project,
        tasks: { ...project.tasks, statusOrder: newStatusOrder }
      }));
      return;
    }

    // movement within a list
    if (start === finish) {
      const newTasksOrder = [...statuses[start].tasks];
      newTasksOrder.splice(source.index, 1);
      newTasksOrder.splice(destination.index, 0, draggableId);

      setProject((project) => ({
        ...project,
        tasks: {
          ...project.tasks,
          statuses: {
            ...project.tasks.statuses,
            [start]: {
              ...project.tasks.statuses[start],
              tasks: newTasksOrder
            }
          }
        }
      }));
      return;
    }

    // movement of a task across lists
    const newStartTasksOrder = [...statuses[start].tasks];
    const newEndTasksOrder = [...statuses[finish].tasks];

    newStartTasksOrder.splice(source.index, 1);
    newEndTasksOrder.splice(destination.index, 0, draggableId);

    setProject((project) => ({
      ...project,
      tasks: {
        ...project.tasks,
        statuses: {
          ...project.tasks.statuses,
          [start]: {
            ...project.tasks.statuses[start],
            tasks: newStartTasksOrder
          },
          [finish]: {
            ...project.tasks.statuses[finish],
            tasks: newEndTasksOrder
          }
        }
      }
    }));
    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="taskboard" type="column" direction="horizontal">
        {(provided, snapshot) => (
          <Paper
            className={classes.root}
            elevation={0}
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getDroppableStyle(snapshot.isDraggingOver)}
          >
            <div className={classes.columnContainer}>
              {statusOrder.map((statusId, index) => (
                <TaskBoardColumn
                  statusId={statusId}
                  key={statusId}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          </Paper>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskBoard;
