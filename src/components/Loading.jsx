import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function Loading() {
  const { container } = useStyles();
  return (
    <div className={container}>
      <CircularProgress />
    </div>
  );
}

export default Loading;
