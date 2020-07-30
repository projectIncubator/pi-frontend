import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { DialogContext, ProjectContext } from '../../../contexts';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  AVAILABLE_COMPONENTS,
  getProjectIndexById,
  projects
} from '../../../mocks';
import { checkUniqueness, copy, reorder } from '../../../utils/dnd';
import { AvailablePage, CurrentComponent } from '../components';
import { getListStyle } from './ProjectSettingsDialogStyles';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingTop: theme.spacing(2),
    minWidth: 780,
    maxWidth: 780,
    minHeight: 560,
    maxHeight: 560
  },
  availableModules: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
}));

export default function OverviewPageDialog() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { open, setOpen } = useContext(DialogContext);
  const { project, pageId, projectId } = useContext(ProjectContext);
  const [currComponents, setCurrComponents] = useState([]);

  useEffect(() => {
    if (open === 'project-overview') {
      setCurrComponents(
        project.pages_modules.pages[pageId].content.modules.map((el) =>
          Object.assign({}, el)
        )
      );
    }
  }, [open, pageId, project]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const newModules = currComponents.filter((el) => {
      switch (el.type) {
        case 'general':
          return Boolean(el.content.contentState);
        case 'description':
          return Boolean(el.content.text);
        default:
          return true;
      }
    });

    const index = getProjectIndexById(projectId);

    projects[index].pages_modules.pages[pageId].content.modules = newModules;
    handleClose();
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
      setCurrComponents((newCurrPages) => {
        const index = newCurrPages.findIndex((item) => item.id === id);
        newCurrPages.splice(index, 1);
        return [...newCurrPages];
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
          reorder(currComponents, source.index, destination.index)
        );
        return;
      }
    }

    if (start === 'available-components' && finish === 'current-components') {
      setCurrComponents(
        copy(AVAILABLE_COMPONENTS, currComponents, source, destination)
      );
      return;
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open === 'project-overview'}
      onClose={handleClose}
      aria-labelledby="project-overview-dialog"
      aria-describedby="project-overview-dialog-description"
      maxWidth="lg"
    >
      <DialogTitle id="project-overview-dialog">
        Overview Page Settings
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography variant="h5" component="h2" gutterBottom>
                Available Modules
              </Typography>
              <Droppable
                droppableId="available-components"
                isDropDisabled={true}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className={classes.availableModules}
                  >
                    {[...AVAILABLE_COMPONENTS].map((item, index) => {
                      const isDisabled = checkUniqueness(item, currComponents);
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
                  Current Modules
                </Typography>
                <Droppable droppableId="current-components">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {currComponents.map((item, index) => (
                        <CurrentComponent
                          key={item.type + index}
                          item={item}
                          index={index}
                          deleteItem={(id) => deleteItem(id)}
                          updateContent={(id, content) =>
                            updateContent(id, content)
                          }
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
