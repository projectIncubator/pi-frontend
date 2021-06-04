import React, { useContext, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { Header, Sidebar } from '../components';
import { ProjectContext } from '../../../contexts';
import DraftRenderer from '../../../components/DraftRenderer';
import { string } from 'prop-types';
import { Loading } from '../../../components';

export default function General({ pageId }) {
  const { page, setPageId } = useContext(ProjectContext);

  useEffect(() => {
    setPageId(pageId);
  }, [pageId, setPageId]);

  const renderPage = () => {
    if (page.meta.id !== pageId) {
      return (
        <div style={{ height: 300 }}>
          <Loading />
        </div>
      );
    } else {
      return (
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={page.meta.sidebar ? 9 : 12}
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Header page="general" title={page.meta.title} isAdmin />
            {Object.keys(page.content).includes('contentState') &&
            Object.keys(page.content.contentState).length > 0 ? (
              <DraftRenderer
                blocks={JSON.parse(page.content.contentState).blocks}
              />
            ) : (
              [1, 2, 3, 4, 5].map((el) => (
                <Typography variant="body1" key={el}>
                  Lorem ipsum dolor asit amet, consectetur adipiscing elit.
                  Donec efficitur eget nisi sit amet gravida. Phasellus eu
                  blandit libero, a blandit est. Nullam vestibulum eget magna
                  vel luctus. Morbi ac accumsan felis, in congue lacus. Aliquam
                  faucibus, est et mollis euismod, lacus lorem consectetur
                  velit, id bibendum nisl ex id neque. Cras porta justo non
                  ipsum tincidunt, ac maximus neque bibendum. Orci varius
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Sed nibh tortor, placerat non suscipit eget,
                  luctus id urna. Phasellus nisl magna, maximus sed nunc eget,
                  venenatis sollicitudin diam. Sed metus orci, porttitor quis
                  faucibus vel, tincidunt at tortor. Vivamus euismod suscipit
                  leo, eu venenatis sem vehicula sit amet. Suspendisse convallis
                  eget quam ac egestas.
                </Typography>
              ))
            )}
          </Grid>
          {page.meta.sidebar && <Sidebar />}
        </Grid>
      );
    }
  };

  return renderPage();
}

General.propTypes = {
  pageId: string.isRequired
};
