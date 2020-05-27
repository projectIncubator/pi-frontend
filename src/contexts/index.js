import React, { createContext, useState } from 'react';

export const GeneralContext = createContext();

export function GeneralProvider(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <GeneralContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {props.children}
    </GeneralContext.Provider>
  );
}
