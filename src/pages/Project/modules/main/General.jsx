import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

import { DraftRenderer } from '../../../../components';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(1.5)
  }
}));

export default function General({ content }) {
  const classes = useStyles();
  const { header, contentState } = content;

  return (
    contentState && (
      <div>
        <Typography variant="h4" className={classes.header}>
          {header}
        </Typography>
        <DraftRenderer blocks={JSON.parse(contentState).blocks} />
      </div>
    )
  );
}

General.propTypes = {
  content: PropTypes.shape({
    header: PropTypes.string,
    contentState: PropTypes.string
  })
};
