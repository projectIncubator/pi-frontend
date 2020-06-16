import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import {
  Button as MUIButton,
  Typography,
  Card,
  Divider,
  IconButton,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { DragIndicator, ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

import { useStyles } from './CurrentPageStyles';

const ComponentCard = React.memo(
  ({ item, index, toggleOpen, deleteItem, updateContent }) => {
    const classes = useStyles();
    const { type, id, open, showing, sidebar } = item;

    const handleClick = () => {
      toggleOpen(id, !open, 'pages');
    };

    const handleDelete = () => {
      deleteItem(id);
    };

    const handleUpdateContent = (id, content) => {
      updateContent(id, content);
    };

    const handleToggle = () => {};

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
                  <div className={classes.formFields}>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={showing}
                            onChange={handleToggle}
                            name={id + 'showing'}
                          />
                        }
                        label="Showing"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={sidebar}
                            onChange={handleToggle}
                            name={id + 'sidebar'}
                          />
                        }
                        label="Sidebar"
                      />
                    </FormGroup>
                  </div>
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
