import React from 'react';
import ReactDOM from 'react-dom';

import { AuthProvider, ThemeProvider } from './contexts';
import AppRouter from './AppRouter';
import './index.css';

ReactDOM.render(
  <AuthProvider>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </AuthProvider>,
  document.getElementById('root')
);
