import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { Header, Sidebar } from '../components';
import { matchType, projectType } from '../../../types';
import { DialogContext } from '../../../contexts';
import DraftRenderer from '../../../components/DraftRenderer';

export default function General({ match, project }) {
  const pageName = match.params['0'];
  const [isLoading, setIsLoading] = useState(true);
  const [pageNotFound, setPageNotFound] = useState(false);
  const [page, setPage] = useState([]);
  const { setPageIndex, setPageTitle } = useContext(DialogContext);

  useEffect(() => {
    const checkPageExists = () => {
      const foundIndex = project.pages.findIndex((el) => {
        return (
          el.type === 'general' &&
          el.content.title.toLowerCase() === pageName.toLowerCase()
        );
      });

      if (foundIndex === -1) {
        setPageNotFound(true);
      } else {
        setPage(project.pages[foundIndex]);
        setIsLoading(false);
        setPageIndex(foundIndex);
        setPageTitle(project.pages[foundIndex].content.title);
      }
    };

    checkPageExists();
  }, [pageName, project.pages, setPageIndex, setPageTitle]);

  const renderPage = () => {
    if (pageNotFound) {
      return <div>Page not found.</div>;
    } else if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={page.sidebar ? 9 : 12}
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Header page="general" title={pageName} isAdmin />
            {Boolean(page.content.contentState) ? (
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
          {page.sidebar && <Sidebar project={project} />}
        </Grid>
      );
    }
  };

  return renderPage();
}

General.propTypes = {
  project: projectType.isRequired,
  match: matchType.isRequired
};
