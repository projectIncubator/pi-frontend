import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import {
  Button as MUIButton,
  Typography,
  Card,
  Divider,
  IconButton
} from '@material-ui/core';
import { DragIndicator, ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

import { Description, General, Milestones } from '../modules/main/settings';
import { useStyles } from './ComponentCardStyles';

const CurrentComponent = React.memo(
  ({ item, index, deleteItem, updateContent }) => {
    const classes = useStyles();
    const { type, id, content } = item;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(!open);
    };

    const handleDelete = () => {
      deleteItem(id);
    };

    const handleUpdateContent = (id, content) => {
      updateContent(id, content);
    };

    const renderModule = (BaseComponent) => {
      return (
        <BaseComponent
          id={id}
          contentProps={content}
          updateContent={(id, content) => handleUpdateContent(id, content)}
        />
      );
    };

    const renderForms = () => {
      switch (type) {
        case 'general':
          return renderModule(General);
        case 'description':
          return renderModule(Description);
        case 'milestones':
          return renderModule(Milestones);
        default:
          return <></>;
      }
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
                <IconButton onClick={handleOpen}>
                  {open ? <ArrowDropUp /> : <ArrowDropDown />}
                </IconButton>
              </div>
            </div>
            {open && (
              <div>
                <Divider />
                <div className={classes.additionalContent}>
                  <div className={classes.formFields}>{renderForms()}</div>
                  <div className={classes.deleteButton}>
                    <MUIButton
                      onClick={handleDelete}
                      color="secondary"
                      size="small"
                    >
                      Delete
                    </MUIButton>
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}
      </Draggable>
    );
  }
);

CurrentComponent.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired
};

export default CurrentComponent;
