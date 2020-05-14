import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import AppRouter from './AppRouter';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <AppRouter />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
