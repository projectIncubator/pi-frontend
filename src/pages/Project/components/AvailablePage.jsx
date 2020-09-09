import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 175,
    marginBottom: theme.spacing(1)
  },
  clone: {
    '& ~ div': {
      transform: 'none !important'
    }
  },
  content: {
    padding: theme.spacing(1),
    '&:last-child': {
      paddingBottom: 14
    }
  },
  header: {
    textTransform: 'capitalize'
  }
}));

export default function AvailablePage({ item, index, isDisabled }) {
  const classes = useStyles();
  const { id, type, subtext } = item;

  const renderContents = (type, subtext) => {
    return (
      <CardContent className={classes.content}>
        <Typography
          variant="h6"
          className={classes.header}
          color={isDisabled ? 'textSecondary' : 'textPrimary'}
        >
          {type}
        </Typography>
        <Typography
          variant="body2"
          color={isDisabled ? 'textSecondary' : 'textPrimary'}
        >
          {subtext}
        </Typography>
      </CardContent>
    );
  };

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDisabled}>
      {(provided, snapshot) => (
        <React.Fragment>
          <Card
            className={classes.root}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {renderContents(type, subtext)}
          </Card>
          {snapshot.isDragging && (
            <Card className={`${classes.root} ${classes.clone}`}>
              {renderContents(type, subtext)}
            </Card>
          )}
        </React.Fragment>
      )}
    </Draggable>
  );
}

AvailablePage.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};
