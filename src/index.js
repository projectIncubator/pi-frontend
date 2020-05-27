import React from 'react';
import ReactDOM from 'react-dom';

import { GeneralProvider } from './contexts';
import AppRouter from './AppRouter';
import './index.css';

ReactDOM.render(
  <GeneralProvider>
    <AppRouter />
  </GeneralProvider>,
  document.getElementById('root')
);
