import React, { useContext } from 'react';
import { Grid, Hidden, makeStyles } from '@material-ui/core';

import { ProjectContext } from '../../../contexts';
import { Membership, RequestToJoin, Resources, Text } from '../modules/sidebar';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: 'sticky',
    top: 125,
    [theme.breakpoints.down('md')]: {
      top: 50 + 42
    }
  }
}));

export default function Sidebar() {
  const classes = useStyles();
  const { project } = useContext(ProjectContext);
  const { sidebar_modules } = project;

  const renderComponent = (props) => {
    switch (props.type) {
      case 'join':
        return <RequestToJoin {...props} />;
      case 'membership':
        return <Membership {...props} projectId={project.meta.id} />;
      case 'resources':
        return <Resources {...props} />;
      case 'text':
        return <Text {...props} />;
      default:
        return <></>;
    }
  };

  return (
    <Hidden smDown>
      <Grid item md={3}>
        <Grid container spacing={2} className={classes.sidebar}>
          {sidebar_modules.map((el, index) => {
            return (
              <Grid item xs={12} key={index}>
                {renderComponent(el)}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Hidden>
  );
}
