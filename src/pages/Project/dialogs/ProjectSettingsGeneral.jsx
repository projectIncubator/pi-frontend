import React, { useState } from 'react';
import { Grid, Switch, Typography } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  switch: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

function ProjectSettingsGeneral() {
  const classes = useStyles();
  const [toggles, setToggles] = useState({
    requestToJoin: true,
    ButtonName: false
  });

  const handleToggles = (event) => {
    setToggles({ ...toggles, [event.target.name]: event.target.checked });
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

  return (
    <Grid container spacing={2} alignItems="center">
      <DropzoneArea
        acceptedFiles={['image/png', 'image/jpg', 'image/jpeg']}
        dropzoneText={'Drag and drop an image here or click'}
        filesLimit={1}
        maxFileSize={5000000}
        // onChange={(files) => console.log('Files:', files)}
      />
      {renderToggles()}
    </Grid>
  );
}

export default ProjectSettingsGeneral;
