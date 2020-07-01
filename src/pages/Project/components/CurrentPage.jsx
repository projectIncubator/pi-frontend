import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import {
  Button as MUIButton,
  Typography,
  Card,
  Divider,
  IconButton,
  FormGroup,
  FormControlLabel,
  TextField,
  Switch
} from '@material-ui/core';
import {
  Edit,
  DragIndicator,
  ArrowDropDown,
  ArrowDropUp
} from '@material-ui/icons';

import { useStyles } from './CurrentPageStyles';

const CurrentPage = React.memo(
  ({ item, index, toggleOpen, toggleSettings, changeTitle, deleteItem }) => {
    const classes = useStyles();
    const { type, id, title, open, showing, sidebar } = item;
    const [isEditing, setIsEditing] = useState(false);
    const [pageTitle, setPageTitle] = useState(title);

    const handleToggleOpen = () => {
      toggleOpen(id, !open, 'pages');
    };

    const handleDelete = () => {
      deleteItem(id);
    };

    const handleToggleSettings = (event, destination) => {
      toggleSettings(id, destination, event.target.checked);
    };

    const handleEditTitle = () => {
      setIsEditing(true);
    };

    const handleChange = (event) => {
      setPageTitle(event.target.value);
    };

    const handleBlurTitle = () => {
      changeTitle(id, pageTitle);
      setIsEditing(false);
    };

    const handleKeyPress = (event) => {
      if (event.keyCode === 13) {
        handleBlurTitle();
      }
    };

    const renderTitle = () => {
      if (isEditing) {
        return (
          <TextField
            onBlur={handleBlurTitle}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            value={pageTitle}
            fullWidth
            autoFocus
          />
        );
      } else {
        return (
          <>
            {type === 'general' && (
              <Edit
                className={classes.editButton}
                fontSize="small"
                onClick={handleEditTitle}
              />
            )}
            <Typography variant="h6" className={classes.header}>
              {title}
            </Typography>
          </>
        );
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
              <div className={classes.type}>{renderTitle()}</div>
              <div className={classes.openToggle}>
                <IconButton onClick={handleToggleOpen}>
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
                            color="primary"
                            checked={showing}
                            onChange={(event) =>
                              handleToggleSettings(event, 'showing')
                            }
                            name={id + 'showing'}
                          />
                        }
                        label="Showing"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            color="primary"
                            checked={sidebar}
                            onChange={(event) =>
                              handleToggleSettings(event, 'sidebar')
                            }
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

CurrentPage.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  toggleOpen: PropTypes.func.isRequired
};

export default CurrentPage;
