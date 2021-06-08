import React, { useContext, useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';

import { ProjectContext } from '../../../contexts';
import { Header, TaskBoard } from '../components';
import { Loading } from '../../../components';
import { getProjectIndexById, projects } from '../../../mocks';

export default function Tasks({ pageId }) {
  const { project, setProject, tasks, setTasks, setPageId } =
    useContext(ProjectContext);
  const [isEditing, setIsEditing] = useState(false);
  const { milestones } = project.tasks;
  const milestonesArray = Object.keys(milestones);

  useEffect(() => {
    setPageId(pageId);
  }, [pageId, setPageId]);

  const handleCancel = () => {
    setTasks(project.tasks);
    setIsEditing(false);
  };

  const handleSave = () => {
    const projIndex = getProjectIndexById(project.meta.id);
    projects[projIndex].tasks = tasks;
    setProject((project) => ({
      ...project,
      tasks
    }));
    setIsEditing(false);
  };

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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" style={{ marginTop: 16 }}>
          Board
        </Typography>
        <div>
          {isEditing ? (
            <div>
              <Button
                color="secondary"
                style={{ marginRight: 8 }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Board</Button>
          )}
        </div>
      </div>
      {Object.keys(tasks).length > 0 ? (
        <TaskBoard isEditing={isEditing} />
      ) : (
        <Loading />
      )}
    </div>
  );
}
