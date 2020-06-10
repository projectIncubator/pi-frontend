import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import {
  makeStyles,
  Typography,
  Card,
  Divider,
  IconButton
} from '@material-ui/core';
import { DragIndicator, ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  main: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    padding: 0
  },
  dragHandle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRight: `1px solid ${theme.palette.divider}`
  },
  openToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  content: {
    padding: theme.spacing(1),
    '&:last-child': {
      paddingBottom: 14
    }
  },
  type: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1)
  },
  header: {
    textTransform: 'capitalize',
    fontWeight: 400
  },
  additionalContent: {
    padding: theme.spacing(1)
  }
}));

export default function ComponentCard({ type, index, id, open, toggleOpen }) {
  const classes = useStyles();

  const handleClick = () => {
    toggleOpen(id, !open);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={classes.root}
        >
          <div className={classes.main}>
            <div className={classes.dragHandle} {...provided.dragHandleProps}>
              <DragIndicator />
            </div>
            <div className={classes.type}>
              <Typography variant="h6" className={classes.header}>
                {type}
              </Typography>
            </div>
            <div className={classes.openToggle}>
              <IconButton onClick={handleClick}>
                {open ? <ArrowDropUp /> : <ArrowDropDown />}
              </IconButton>
            </div>
          </div>
          {open && (
            <div>
              <Divider />
              <div className={classes.additionalContent}>More content</div>
            </div>
          )}
        </Card>
      )}
    </Draggable>
  );
}

ComponentCard.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired
};
