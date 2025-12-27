import React, { StrictMode } from 'react';
import './index.scss';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App/>
  </StrictMode>
);
