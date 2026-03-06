import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeDemoData } from './utils/initializeDemo';

// Initialize demo data on first load
initializeDemoData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);