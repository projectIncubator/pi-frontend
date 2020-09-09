import React from 'react';
import ReactDOM from 'react-dom';

import Dialogs from './dialogs';
import { AuthProvider, ThemeProvider, DialogProvider } from './contexts';
import AppRouter from './AppRouter';
import './index.css';
import 'draft-js/dist/Draft.css';

ReactDOM.render(
  <AuthProvider>
    <ThemeProvider>
      <DialogProvider>
        <AppRouter />
        <Dialogs />
      </DialogProvider>
    </ThemeProvider>
  </AuthProvider>,
  document.getElementById('root')
);
