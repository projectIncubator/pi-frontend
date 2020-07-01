import React, { createContext, useEffect, useState } from 'react';

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [project, setProject] = useState({});
  const [page, setPage] = useState({ meta: { id: '' }, content: {} });
  const [projectId, setProjectId] = useState('');

  useEffect(() => {
    if (Object.keys(project) > 0) {
      if (project.meta.id !== projectId) {
        setProjectId(project.meta.id);
      }
    }
  }, [project, projectId]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        projectId,
        setProjectId,
        page,
        setPage
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
