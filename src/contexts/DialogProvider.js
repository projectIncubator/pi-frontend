import React, { createContext, useState } from 'react';

export const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [pageIndex, setPageIndex] = useState(-1);
  const [pageTitle, setPageTitle] = useState('');

  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        projectId,
        setProjectId,
        pageIndex,
        setPageIndex,
        pageTitle,
        setPageTitle
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
