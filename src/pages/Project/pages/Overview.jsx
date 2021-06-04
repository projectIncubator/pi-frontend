import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { Header, Sidebar } from '../components';
import { ProjectContext } from '../../../contexts';
import { Loading } from '../../../components';
import { General, Description, Milestones } from '../modules/main';

export default function Overview({ pageId }) {
  const { project, page, setPageId } = useContext(ProjectContext);

  useEffect(() => {
    setPageId(pageId);
  }, [pageId, setPageId]);

  const renderComponents = (el) => {
    switch (el.type) {
      case 'general':
        return <General content={el.content} />;
      case 'description':
        return <Description content={el.content} />;
      case 'milestones':
        return <Milestones content={el.content} />;
      default:
        break;
    }
  };

  return page.meta.id !== pageId ? (
    <div style={{ height: 300 }}>
      <Loading />
    </div>
  ) : (
    <Grid container spacing={3}>
      <Grid item xs={12} md={page.meta.sidebar ? 9 : 12}>
        <Header
          page="overview"
          title={project.meta.title}
          isAdmin
          status="ongoing"
        />
        <Grid container spacing={2}>
          {page.content.modules.map((el, index) => (
            <Grid item xs={12} key={index}>
              {renderComponents(el)}
            </Grid>
          ))}
        </Grid>
      </Grid>
      {page.meta.sidebar && <Sidebar />}
    </Grid>
  );
}