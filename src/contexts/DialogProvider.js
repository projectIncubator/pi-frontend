import React, { createContext, useState } from 'react';

export const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState('');

  return (
    <DialogContext.Provider value={{ open, setOpen, projectId, setProjectId }}>
      {children}
    </DialogContext.Provider>
  );
}
