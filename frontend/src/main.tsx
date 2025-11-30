import { StrictMode } from 'react'
import './index.scss'
import App from './App.tsx'
import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App/>
  </StrictMode>
  );
