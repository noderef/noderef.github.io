import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@mantine/core/styles.css';
import './main.css';
import { NodeRefThemeProvider } from './theme/NodeRefThemeProvider.tsx';
import './i18n/config';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NodeRefThemeProvider>
      <App />
    </NodeRefThemeProvider>
  </React.StrictMode>,
);
