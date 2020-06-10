import React, { useContext, useState } from 'react';
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
  DialogTitle
} from '@material-ui/core';

import { DialogContext } from '../contexts';
import { ComponentCard, AvailableCard } from '../pages/Project/components';

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

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    minWidth: 700,
    minHeight: 560,
    maxHeight: 560
  },
  leftColumn: {},
  rightColumn: {},
  availableModules: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  card: {
    width: 175,
    borderRadius: 4
  }
}));

const AVAILABLE_COMPONENTS = [
  {
    type: 'membership',
    subtext: 'Show your list of members.',
    id: uuid(),
    open: false
  },
  {
    type: 'resources',
    subtext: 'Set useful external links.',
    id: uuid(),
    open: false
  },
  {
    type: 'button',
    subtext: 'Create a button with various functions.',
    id: uuid(),
    open: false
  },
  {
    type: 'text',
    subtext: 'Display custom text.',
    id: uuid(),
    open: false
  },
  {
    type: 'positions',
    subtext: 'Show a progress bar of positions you are looking for.',
    id: uuid(),
    open: false
  }
];

const CURRENT_COMPONENTS = [
  {
    type: 'button',
    id: uuid(),
    open: false,
    header: '',
    text: 'Request to Join'
  },
  { type: 'membership', id: uuid(), open: false, header: 'Membership' },
  {
    type: 'resources',
    id: uuid(),
    open: false,
    header: 'Resources',
    content: [
      { text: 'Discord', link: 'https://discord.com/' },
      { text: 'Slack', link: 'https://slack.com/intl/en-ca/' },
      { text: 'Resource 1', link: 'https://google.com/' }
    ]
  },
  {
    type: 'text',
    id: uuid(),
    open: false,
    header: 'Test Header',
    text: `Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.`
  }
];

const getListStyle = (isDraggingOver) => ({
  minHeight: '500px',
  maxHeight: '500px',
  overflowY: 'auto',
  background: isDraggingOver ? 'lightblue' : ''
});

export default function OverviewSettingsDialog() {
  const classes = useStyles();
  const { open, setOpen } = useContext(DialogContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentComponents, setCurrComponents] = useState([
    ...CURRENT_COMPONENTS
  ]);

  const handleClose = () => {
    setOpen(false);
  };

  const toggleOpen = (id, newOpen) => {
    const newCurrComponents = [...currentComponents];
    const index = newCurrComponents.findIndex((item) => item.id === id);

    newCurrComponents[index].open = newOpen;
    setCurrComponents(newCurrComponents);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish) {
      setCurrComponents(
        reorder(currentComponents, source.index, destination.index)
      );
      return;
    }

    if (start === 'available-components' && finish === 'current-components') {
      setCurrComponents(
        copy(AVAILABLE_COMPONENTS, currentComponents, source, destination)
      );
      return;
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open === 'overview-settings'}
      onClose={handleClose}
      aria-labelledby="overview-settings-dialog"
      aria-describedby="overview-settings-dialog-description"
      maxWidth="lg"
    >
      <DialogTitle id="overview-settings-dialog-title">
        {'Overview Page Settings'}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={3} className={classes.columns}>
            <Grid item xs={4} className={classes.leftColumn}>
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
                    {AVAILABLE_COMPONENTS.map((item, index) => (
                      <AvailableCard
                        key={index + item.type}
                        index={index}
                        id={item.id}
                        type={item.type}
                        subtext={item.subtext}
                      />
                    ))}
                  </div>
                )}
              </Droppable>
            </Grid>
            <Grid item xs={8} className={classes.rightColumn}>
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
                        type={item.type}
                        index={index}
                        id={item.id}
                        open={item.open}
                        toggleOpen={toggleOpen}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
          </Grid>
        </DragDropContext>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
