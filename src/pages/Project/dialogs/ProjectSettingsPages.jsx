import React, { useCallback, useContext } from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { copy, reorder, checkUniqueness } from '../../../utils/dnd';
import { AVAILABLE_PAGES } from '../../../mocks';
import { AvailablePage, CurrentPage } from '../components';
import { getListStyle } from './ProjectSettingsDialogStyles';
import { ProjectContext } from '../../../contexts';

const useStyles = makeStyles((theme) => ({
  switch: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

function ProjectSettingsPages() {
  const classes = useStyles();
  const { currentPages, setCurrPages } = useContext(ProjectContext);

  const changePageTitle = (id, newTitle) => {
    const newPages = [...currentPages];
    const index = newPages.findIndex((el) => el.id === id);
    if (index !== -1) {
      newPages[index].title = newTitle;
      setCurrPages(newPages);
    }
  };

  const togglePagesSettings = (id, destination, settingBool) => {
    const newPages = [...currentPages];
    const index = newPages.findIndex((el) => el.id === id);

    if (index !== -1) {
      newPages[index][destination] = settingBool;
      setCurrPages(newPages);
    }
  };

  const toggleOpen = (id, newOpen) => {
    const newCurrPages = [...currentPages];
    const pageIndex = newCurrPages.findIndex((item) => item.id === id);

    if (pageIndex !== -1) {
      newCurrPages[pageIndex].open = newOpen;
      setCurrPages(newCurrPages);
    }
  };

  const deleteItem = useCallback(
    (id) => {
      setCurrPages((newCurrPages) => {
        const index = newCurrPages.findIndex((item) => item.id === id);
        newCurrPages.splice(index, 1);
        return [...newCurrPages];
      });
    },
    [setCurrPages]
  );

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish) {
      if (start === 'current-pages') {
        setCurrPages(reorder(currentPages, source.index, destination.index));
        return;
      }
    }

    if (start === 'available-pages' && finish === 'current-pages') {
      setCurrPages(copy(AVAILABLE_PAGES, currentPages, source, destination));
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Available Pages
          </Typography>
          <Droppable droppableId="available-pages" isDropDisabled={true}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} className={classes.availableModules}>
                {[...AVAILABLE_PAGES].map((item, index) => {
                  const isDisabled = checkUniqueness(item, currentPages);
                  return (
                    <AvailablePage
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
          <div>
            <Typography variant="h5" component="h2" gutterBottom>
              Public View
            </Typography>
            <Droppable droppableId="current-pages">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {currentPages.map((item, index) => (
                    <CurrentPage
                      key={item.type + index}
                      item={item}
                      index={index}
                      toggleOpen={toggleOpen}
                      toggleSettings={togglePagesSettings}
                      changeTitle={changePageTitle}
                      deleteItem={(id) => deleteItem(id)}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </Grid>
      </Grid>
    </DragDropContext>
  );
}

export default ProjectSettingsPages;
