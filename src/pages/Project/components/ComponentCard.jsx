import React from 'react';
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

import {
  Text,
  Resources,
  Membership,
  Positions,
  Button
} from '../modules/sidebar/settings';
import { useStyles } from './ComponentCardStyles';

const ComponentCard = React.memo(
  ({ item, index, toggleOpen, deleteComponent, updateContent }) => {
    const classes = useStyles();
    const { type, id, open, content } = item;
    const { header } = content;

    const handleClick = () => {
      toggleOpen(id, !open);
    };

    const handleDelete = () => {
      deleteComponent(id);
    };

    const handleUpdateContent = (id, content) => {
      updateContent(id, content);
    };

    const renderModule = (BaseComponent) => {
      return (
        <BaseComponent
          id={id}
          headerProps={header}
          contentProps={content}
          updateContent={(id, content) => handleUpdateContent(id, content)}
        />
      );
    };

    const renderForms = () => {
      switch (type) {
        case 'text':
          return renderModule(Text);
        case 'button':
          return renderModule(Button);
        case 'membership':
          return renderModule(Membership);
        case 'resources':
          return renderModule(Resources);
        case 'positions':
          return renderModule(Positions);
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
                <IconButton onClick={handleClick}>
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

ComponentCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  toggleOpen: PropTypes.func.isRequired
};

export default ComponentCard;
