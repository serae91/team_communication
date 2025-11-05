import { StrictMode } from 'react'
import './index.scss'
import App from './App.tsx'
import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById('root') as HTMLElement;
console.log('rootElement =', rootElement);

if (!rootElement) {
  throw new Error('Root-Element nicht gefunden!');
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
  )
