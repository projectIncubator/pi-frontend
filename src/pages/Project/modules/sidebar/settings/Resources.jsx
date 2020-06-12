import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Button,
  Grid,
  IconButton,
  TextField
} from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons';

import {
  deleteButtonParentStyles,
  deleteButtonStyles
} from '../../../components/ComponentCardStyles';

const useStyles = makeStyles((theme) => ({
  addNewResource: {
    backgroundColor: theme.palette.grey['300'],
    '&:hover': {
      backgroundColor: theme.palette.grey['400']
    }
  },
  gridContainer: {
    '&:hover': {
      '& > div > button': {
        width: '30px !important',
        marginRight: '8px !important',
        padding: '3px !important',
        visibility: 'visible !important',
        transform: 'translate(0, 0) !important'
      }
    }
  }
}));

export default function Resources({ id, contentProps, updateContent }) {
  const classes = useStyles();
  const [content, setContent] = useState({ ...contentProps });

  useEffect(() => {
    updateContent(id, { ...content });
  }, [content]);

  const handleDeleteResource = (index) => {
    const newContent = { ...content };
    newContent.resources = newContent.resources.filter(
      (el, elIndex) => elIndex !== index
    );
    setContent(newContent);
  };

  const handleAddNewResource = () => {
    const newContent = { ...content };
    newContent.resources.push({
      type: 'Custom',
      text: '',
      link: ''
    });
    setContent(newContent);
  };

  const handleChange = (evt, target, index) => {
    const newContent = { ...content };
    target === 'header'
      ? (newContent.header = evt.target.value)
      : (newContent.resources[index][target] = evt.target.value);
    setContent(newContent);
  };

  return (
    <>
      <TextField
        id="header-input-field-resources"
        label="Header"
        size="small"
        variant="outlined"
        value={content.header}
        onChange={(event) => handleChange(event, 'header')}
      />
      {content.resources.map((el, idx) => {
        return (
          <Grid
            container
            spacing={2}
            key={idx}
            className={classes.gridContainer}
          >
            <Grid item xs={5} style={deleteButtonParentStyles}>
              {el.type === 'Custom' && (
                <IconButton
                  size="small"
                  disableFocusRipple
                  style={deleteButtonStyles}
                  onClick={() => handleDeleteResource(idx)}
                >
                  <Delete color="secondary" />
                </IconButton>
              )}
              <TextField
                label={el.type !== 'Custom' ? '' : 'Custom'}
                size="small"
                variant="outlined"
                value={el.text || el.type || ''}
                onChange={(event) => handleChange(event, 'text', idx)}
                disabled={el.type !== 'Custom'}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                label="Link"
                size="small"
                variant="outlined"
                value={el.link || ''}
                required={el.type === 'Custom'}
                onChange={(event) => handleChange(event, 'link', idx)}
                fullWidth
              />
            </Grid>
          </Grid>
        );
      })}

      <Button
        fullWidth
        onClick={handleAddNewResource}
        className={classes.addNewResource}
      >
        <AddCircle />
      </Button>
    </>
  );
}
