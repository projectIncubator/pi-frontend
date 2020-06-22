import React, { useContext, useState, useCallback, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import {
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Switch,
  Paper,
  Tabs,
  Tab
} from '@material-ui/core';

import {
  projects,
  getProjectIndexById,
  AVAILABLE_SIDEBAR_COMPONENTS,
  AVAILABLE_PAGES
} from '../mocks';
import { DialogContext } from '../contexts';
import {
  ComponentCard,
  AvailableCard,
  AvailablePage,
  CurrentPage
} from '../pages/Project/components';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingTop: theme.spacing(2),
    minWidth: 780,
    minHeight: 560,
    maxHeight: 560
  },
  headerPaper: {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none'
  },
  availableModules: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  card: {
    width: 175,
    borderRadius: 4
  },
  switch: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const getListStyle = (isDraggingOver) => ({
  minHeight: '500px',
  maxHeight: '500px',
  overflowY: 'auto',
  background: isDraggingOver ? 'lightblue' : ''
});

export default function ProjectSettingsDialog() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { open, setOpen, projectId } = useContext(DialogContext);
  const [currentComponents, setCurrComponents] = useState([]);
  const [currentPages, setCurrPages] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [toggles, setToggles] = useState({
    requestToJoin: true,
    ButtonName: false
  });

  useEffect(() => {
    if (projectId) {
      const getCurrComponents = () => {
        const foundIndex = getProjectIndexById(projectId);
        const foundProject = { ...projects[foundIndex] };
        const newSidebarModules = foundProject.sidebar_modules.map((el) => {
          return { ...el, id: uuid() };
        });
        const newPages = foundProject.pages.map((el) => {
          return { ...el, id: uuid() };
        });

        setCurrComponents(newSidebarModules);
        setCurrPages(newPages);
      };
      getCurrComponents();
    }
  }, [projectId]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabs = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleToggles = (event) => {
    setToggles({ ...toggles, [event.target.name]: event.target.checked });
  };

  const handleSave = () => {
    const foundIndex = getProjectIndexById(projectId);

    const cleanPagesModules = () => {
      return currentPages.map((el) => ({
        type: el.type,
        showing: el.showing,
        sidebar: el.sidebar
      }));
    };

    const cleanSidebarModules = () => {
      return currentComponents.map((el) => ({
        type: el.type,
        content: el.content
      }));
    };

    const newPagesModules = cleanPagesModules();
    const newSidebarModules = cleanSidebarModules();

    projects[foundIndex].pages = newPagesModules;
    projects[foundIndex].sidebar_modules = newSidebarModules;

    setOpen(false);
  };

  const togglePagesSettings = (id, destination, settingBool) => {
    const newPages = [...currentPages];
    const index = newPages.findIndex((el) => el.id === id);

    if (index !== -1) {
      newPages[index][destination] = settingBool;
      setCurrPages(newPages);
    }
  };

  const toggleOpen = (id, newOpen, destination) => {
    switch (destination) {
      case 'sidebar':
        const newCurrComponents = [...currentComponents];
        const index = newCurrComponents.findIndex((item) => item.id === id);

        if (index !== -1) {
          newCurrComponents[index].open = newOpen;
          setCurrComponents(newCurrComponents);
        }
        break;
      case 'pages':
        const newCurrPages = [...currentPages];
        const pageIndex = newCurrPages.findIndex((item) => item.id === id);

        if (pageIndex !== -1) {
          newCurrPages[pageIndex].open = newOpen;
          setCurrPages(newCurrPages);
        }
        break;
      default:
        return;
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
    (id, destination) => {
      switch (destination) {
        case 'sidebar':
          setCurrComponents((newCurrComponents) => {
            const index = newCurrComponents.findIndex((item) => item.id === id);
            newCurrComponents.splice(index, 1);
            return [...newCurrComponents];
          });
          break;
        case 'pages':
          setCurrPages((newCurrPages) => {
            const index = newCurrPages.findIndex((item) => item.id === id);
            newCurrPages.splice(index, 1);
            return [...newCurrPages];
          });
          break;
        default:
          return;
      }
    },
    [setCurrComponents, setCurrPages]
  );

  // drag and drop logic
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
  };

  const checkUniqueness = (item, destination) => {
    // return true to disable drag component
    if (item.unique && destination === 'pages') {
      const result = currentPages.find((el) => el.type === item.type);
      return Boolean(result);
    } else if (item.unique && destination === 'sidebar') {
      const result = currentComponents.find((el) => el.type === item.type);
      return Boolean(result);
    }
    return false;
  };

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
      } else if (start === 'current-pages') {
        setCurrPages(reorder(currentPages, source.index, destination.index));
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

    if (start === 'available-pages' && finish === 'current-pages') {
      setCurrPages(copy(AVAILABLE_PAGES, currentPages, source, destination));
      return;
    }
  };

  const renderToggles = () => {
    const togglesArray = [
      ['Show "Request to Join" button', 'requestToJoin'],
      ['Lorem Ipsum', 'ButtonName']
    ];

    return togglesArray.map((el) => (
      <React.Fragment key={el[1]}>
        <Grid item xs={10}>
          <Typography>{el[0]}</Typography>
        </Grid>
        <Grid item xs={2} className={classes.switch}>
          <Switch
            checked={toggles[el[1]]}
            onChange={handleToggles}
            color="primary"
            name={el[1]}
          />
        </Grid>
      </React.Fragment>
    ));
  };

  const renderContent = (tabIndex) => {
    if (tabIndex === 0) {
      return (
        <Grid container spacing={2} alignItems="center">
          {renderToggles()}
        </Grid>
      );
    } else if (tabIndex === 1) {
      return (
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography variant="h5" component="h2" gutterBottom>
              Available Pages
            </Typography>
            <Droppable droppableId="available-pages" isDropDisabled={true}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={classes.availableModules}
                >
                  {AVAILABLE_PAGES.map((item, index) => {
                    const isDisabled = checkUniqueness(item, 'pages');
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
                        deleteItem={(id) => deleteItem(id, 'pages')}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </Grid>
        </Grid>
      );
    } else if (tabIndex === 2) {
      return <></>;
    } else if (tabIndex === 3) {
      return <></>;
    } else if (tabIndex === 4) {
      return (
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography variant="h5" component="h2" gutterBottom>
              Available Modules
            </Typography>
            <Droppable droppableId="available-components" isDropDisabled={true}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={classes.availableModules}
                >
                  {AVAILABLE_SIDEBAR_COMPONENTS.map((item, index) => {
                    const isDisabled = checkUniqueness(item, 'sidebar');
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
                      deleteItem={(id) => deleteItem(id, 'sidebar')}
                      updateContent={(id, content) =>
                        updateContent(id, content)
                      }
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open === 'project-settings'}
      onClose={handleClose}
      aria-labelledby="project-settings-dialog"
      aria-describedby="project-settings-dialog-description"
      maxWidth="lg"
    >
      <Paper className={classes.headerPaper}>
        <Tabs
          value={tabValue}
          onChange={handleTabs}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General" />
          <Tab label="Pages" />
          <Tab label="Members" />
          <Tab label="Positions" />
          <Tab label="Sidebar" />
        </Tabs>
      </Paper>
      <DialogContent className={classes.dialogContent}>
        <DragDropContext onDragEnd={onDragEnd}>
          {renderContent(tabValue)}
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
