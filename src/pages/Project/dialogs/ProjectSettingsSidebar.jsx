import React, { useCallback, useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Grid, Typography, makeStyles } from '@material-ui/core';

import { copy, reorder, checkUniqueness } from '../../../utils/dnd';
import { AVAILABLE_SIDEBAR_COMPONENTS } from '../../../mocks';
import { AvailableCard, ComponentCard } from '../components';
import { getListStyle } from './ProjectSettingsDialogStyles';
import { ProjectContext } from '../../../contexts';

const useStyles = makeStyles((theme) => ({
  availableModules: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
}));

function ProjectSettingsSidebar() {
  const classes = useStyles();
  const { currentComponents, setCurrComponents } = useContext(ProjectContext);

  const toggleOpen = (id, newOpen) => {
    const newCurrComponents = [...currentComponents];
    const index = newCurrComponents.findIndex((item) => item.id === id);

    if (index !== -1) {
      newCurrComponents[index].open = newOpen;
      setCurrComponents(newCurrComponents);
    }
  };

  const updateContent = useCallback(
    (id, content) => {
      setCurrComponents((newCurrComponents) => {
        const index = newCurrComponents.findIndex((item) => item.id === id);
        if (index !== -1) {
          newCurrComponents[index].content = content;
          return newCurrComponents;
        }
      });
    },
    [setCurrComponents]
  );

  const deleteItem = useCallback(
    (id) => {
      setCurrComponents((newCurrComponents) => {
        const index = newCurrComponents.findIndex((item) => item.id === id);
        newCurrComponents.splice(index, 1);
        return [...newCurrComponents];
      });
    },
    [setCurrComponents]
  );

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish) {
      if (start === 'current-components') {
        setCurrComponents(
          reorder(currentComponents, source.index, destination.index)
        );
        return;
      }
    }

    if (start === 'available-components' && finish === 'current-components') {
      setCurrComponents(
        copy(
          AVAILABLE_SIDEBAR_COMPONENTS,
          currentComponents,
          source,
          destination
        )
      );
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Available Modules
          </Typography>
          <Droppable droppableId="available-components" isDropDisabled={true}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} className={classes.availableModules}>
                {AVAILABLE_SIDEBAR_COMPONENTS.map((item, index) => {
                  const isDisabled = checkUniqueness(item, currentComponents);
                  return (
                    <AvailableCard
                      key={index + item.type}
                      index={index}
                      item={item}
                      isDisabled={isDisabled}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5" component="h2" gutterBottom>
            Current Modules
          </Typography>
          <Droppable droppableId="current-components">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {currentComponents.map((item, index) => (
                  <ComponentCard
                    key={item.type + index}
                    item={item}
                    index={index}
                    toggleOpen={toggleOpen}
                    deleteItem={(id) => deleteItem(id)}
                    updateContent={(id, content) => updateContent(id, content)}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
      </Grid>
    </DragDropContext>
  );
}

export default ProjectSettingsSidebar;
