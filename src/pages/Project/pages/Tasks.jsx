import React, { useContext, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

import { ProjectContext } from '../../../contexts';
import { Header } from '../components';

export default function Tasks({ pageId }) {
  const {
    project: { tasks },
    setPageId
  } = useContext(ProjectContext);
  const tasksArray = Object.keys(tasks);

  const convertToLevel = (depth) => {
    switch (depth) {
      case 1:
        return 'Milestone';
      case 2:
        return 'Task';
      case 3:
        return 'Subtask';
      default:
        return;
    }
  };

  useEffect(() => {
    setPageId(pageId);
  }, [pageId, setPageId]);

  return (
    <div>
      <Header page="tasks" title="Tasks" />
      <Grid container spacing={3}>
        {tasksArray.map((taskId) => {
          const task = tasks[taskId];
          return (
            <Grid key={taskId} item xs={12} sm={6} md={4} lg={3}>
              <Card variant="elevation" elevation={2}>
                <CardContent>
                  <Typography variant="body2">
                    {convertToLevel(task.depth)}
                  </Typography>
                  <Typography variant="h5">{task.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
 