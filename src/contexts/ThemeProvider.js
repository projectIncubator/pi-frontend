import React, { createContext, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  MuiThemeProvider,
  responsiveFontSizes
} from '@material-ui/core/styles';
import { lightTheme, darkTheme } from '../themes';

const light = responsiveFontSizes(createMuiTheme(lightTheme));
const dark = responsiveFontSizes(createMuiTheme(darkTheme));

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <MuiThemeProvider theme={isDarkMode ? dark : light}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
