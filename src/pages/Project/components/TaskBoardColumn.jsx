import React, { useContext, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Typography, InputBase } from '@material-ui/core';

import { ProjectContext } from '../../../contexts';
import { TaskBoardItem } from './index';
import { useStyles } from './TaskBoardColumnStyles';

const getDroppableStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightgrey' : ''
});

function TaskBoardColumn({ statusId, index, isEditing }) {
  const classes = useStyles(isEditing);
  const {
    tasks: { statuses, lastTaskId },
    setTasks
  } = useContext(ProjectContext);
  const { title, tasks } = statuses[statusId];
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState(title);

  const handleNewTask = () => {
    const newStatusTasks = [...tasks];
    const newTaskId = lastTaskId + 1;
    newStatusTasks.push(newTaskId);
    const newTask = {
      text: '',
      id: newTaskId,
      milestone: null,
      subtasks: [],
      members: [],
      status: title,
      createdDate: new Date()
    };

    setTasks((tasks) => ({
      ...tasks,
      lastTaskId: lastTaskId + 1,
      tasks: {
        ...tasks.tasks,
        [newTaskId]: newTask
      },
      statuses: {
        ...tasks.statuses,
        [statusId]: {
          ...tasks.statuses[statusId],
          tasks: newStatusTasks
        }
      }
    }));

    setEditingTaskId(newTaskId);
  };

  const handleHeaderChange = (event) => {
    if (event.target.value.length < 100) setNewTitle(event.target.value);
  };

  const handleHeaderClick = () => {
    if (isEditing) setIsEditingHeader(true);
  };

  const handleHeaderLeave = () => {
    if (newTitle.length > 0) {
      setTasks((tasks) => ({
        ...tasks,
        statuses: {
          ...tasks.statuses,
          [statusId]: {
            ...tasks.statuses[statusId],
            title: newTitle
          }
        }
      }));
    } else {
      setNewTitle(title);
    }
    setIsEditingHeader(false);
  };

  const handleDeselect = () => {
    setEditingTaskId(null);
  };

  return (
    <Draggable draggableId={statusId} index={index} isDragDisabled={!isEditing}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={classes.column}
        >
          <div {...provided.dragHandleProps} className={classes.columnHeader}>
            {isEditingHeader ? (
              <InputBase
                classes={{
                  input: classes.headerInput,
                  multiline: classes.headerMultiline
                }}
                onChange={handleHeaderChange}
                value={newTitle}
                onBlur={handleHeaderLeave}
                autoFocus
                fullWidth
                multiline
              />
            ) : (
              <Typography
                onClick={handleHeaderClick}
                variant="h6"
                className={classes.headerText}
              >
                {newTitle}
              </Typography>
            )}
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
                    deselect={handleDeselect}
                    isEditingHeader={taskId === editingTaskId}
                    isEditing={isEditing}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {isEditing && (
            <div className={classes.new} onClick={handleNewTask}>
              + Add new task
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default TaskBoardColumn;
