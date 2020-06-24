import React, { createContext, useState } from 'react';

export const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [pageIndex, setPageIndex] = useState(-1);

  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        projectId,
        setProjectId,
        pageIndex,
        setPageIndex
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
