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
  const [image, setImage] = useState([]);
  const [error, setError] = useState(null);

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

  const handleUpload = async (files) => {
    const body = new FormData();
    body.append('file', files);
    console.log('Files:', body);
    await fetch(
      'http://localhost:8000/project/6e2f8633-8743-4214-9115-d4e65a76b113/upload/harry',
      {
        method: 'PUT',
        body: body
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <DropzoneArea
        acceptedFiles={['image/png', 'image/jpg', 'image/jpeg']}
        dropzoneText={'Drag and drop an image here or click'}
        filesLimit={1}
        maxFileSize={5000000}
        // onChange={(files) => console.log('Files:', files)}
        onChange={(files) => handleUpload(files)}
      />
      {renderToggles()}
    </Grid>
  );
}

export default ProjectSettingsGeneral;