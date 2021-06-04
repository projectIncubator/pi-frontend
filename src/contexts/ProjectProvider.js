import React, { createContext, useEffect, useState } from 'react';
import { getPageContentById, getPageMetaById } from '../mocks';

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [project, setProject] = useState({});
  const [page, setPage] = useState({ meta: { id: '' }, content: {} });
  const [pageId, setPageId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [task, setTask] = useState({});

  // Settings variables
  const [currentPages, setCurrPages] = useState([]);
  const [currentComponents, setCurrComponents] = useState([]);
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    if (Object.keys(project).length > 0) {
      setTasks(project.tasks);
      setCurrPages(project.meta.pages_order.map((el) => Object.assign({}, el)));
      setCurrComponents(
        project.sidebar_modules.map((el) => Object.assign({}, el))
      );

      if (project.meta.id !== projectId) {
        setProjectId(project.meta.id);
      }
    }
  }, [project, projectId]);

  useEffect(() => {
    if (pageId && page.meta.id !== pageId) {
      const newPage = {
        meta: getPageMetaById(projectId, pageId),
        content: getPageContentById(projectId, pageId)
      };

      setPage(newPage);
    }
  }, [pageId, page.meta.id, projectId]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        projectId,
        setProjectId,
        page,
        setPage,
        pageId,
        setPageId,
        currentPages,
        setCurrPages,
        currentComponents,
        setCurrComponents,
        task,
        setTask,
        tasks,
        setTasks
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}