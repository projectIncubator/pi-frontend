import React, { useContext, useEffect } from 'react';
import { Header } from '../components';
import { ProjectContext } from '../../../contexts';

function Discussions({ pageId }) {
  const { setPageId } = useContext(ProjectContext);

  useEffect(() => {
    setPageId(pageId);
  }, [pageId, setPageId]);

  return (
    <div>
      <Header title="Discussions" isAdmin />
    </div>
  );
}

export default Discussions;
