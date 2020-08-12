import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
  Grid,
  Card,
  CardContent
} from '@material-ui/core';
import { ProjectContext } from '../../../../contexts';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(1.5)
  }
}));

export default function Milestones({ content }) {
  const classes = useStyles();
  const { header } = content;
  const {
    project: {
      tasks: { milestones }
    }
  } = useContext(ProjectContext);
  const milestonesArray = Object.keys(milestones);

  return (
    <div>
      {header && (
        <Typography variant="h4" className={classes.header}>
          {header}
        </Typography>
      )}
      <Grid container spacing={2}>
        {milestonesArray.map((milestoneId) => {
          const milestone = milestones[milestoneId];
          return (
            <Grid key={milestoneId} item xs={12} sm={6} md={4} lg={3}>
              <Card variant="elevation" elevation={2}>
                <CardContent>
                  <Typography variant="body2">Milestones</Typography>
                  <Typography variant="h5">{milestone.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

Milestones.propTypes = {
  content: PropTypes.shape({
    header: PropTypes.string
  })
};
