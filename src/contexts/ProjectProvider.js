import React, { createContext, useEffect, useState } from 'react';

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [project, setProject] = useState({});
  const [page, setPage] = useState({ meta: { id: '' }, content: {} });
  const [projectId, setProjectId] = useState('');

  // Settings variables
  const [currentPages, setCurrPages] = useState([]);
  const [currentComponents, setCurrComponents] = useState([]);

  useEffect(() => {
    if (Object.keys(project).length > 0) {
      setCurrPages(project.meta.pages_order.map((el) => Object.assign({}, el)));
      setCurrComponents(
        project.sidebar_modules.map((el) => Object.assign({}, el))
      );

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
        setPage,
        currentPages,
        setCurrPages,
        currentComponents,
        setCurrComponents
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
