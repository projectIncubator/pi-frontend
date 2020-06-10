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

export default function AvailableCard({ type, subtext, index, id }) {
  const classes = useStyles();

  const renderContents = (type, subtext) => {
    return (
      <CardContent className={classes.content}>
        <Typography variant="h6" className={classes.header}>
          {type}
        </Typography>
        <Typography variant="body2">{subtext}</Typography>
      </CardContent>
    );
  };

  return (
    <Draggable draggableId={id} index={index}>
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

AvailableCard.propTypes = {
  type: PropTypes.string.isRequired,
  subtext: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};
