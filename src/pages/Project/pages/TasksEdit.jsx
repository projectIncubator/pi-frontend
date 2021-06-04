import React, { useContext, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

import { ProjectContext } from '../../../contexts';
import { Header, TaskBoard } from '../components';

export default function TasksEdit({ pageId }) {
  const {
    project: {
      tasks: { milestones }
    },
    setPageId
  } = useContext(ProjectContext);
  const milestonesArray = Object.keys(milestones);

  useEffect(() => {
    setPageId(pageId);
  }, [pageId, setPageId]);

  return (
    <div>
      <Header page="tasks" title="Milestones" />
      <Grid container spacing={3}>
        {milestonesArray.map((milestoneId) => {
          const milestone = milestones[milestoneId];
          return (
            <Grid key={milestoneId} item xs={12} sm={6} md={4} lg={3}>
              <Card variant="elevation" elevation={2}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {milestone.text}
                  </Typography>
                  <Typography variant="body2">
                    {milestone.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Typography variant="h4" style={{ marginTop: 16 }}>
        Board
      </Typography>
      <TaskBoard />
    </div>
  );
}
