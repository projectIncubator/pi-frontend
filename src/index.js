import React from 'react';
import ReactDOM from 'react-dom';
import {
  createMuiTheme,
  MuiThemeProvider,
  responsiveFontSizes
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';
import AppRouter from './AppRouter';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={responsiveFontSizes(createMuiTheme(theme))}>
      <CssBaseline />
      <AppRouter />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
