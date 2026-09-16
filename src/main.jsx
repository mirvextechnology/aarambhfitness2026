/**
 * Entry point.
 * Global styles are imported in cascade order: tokens → reset → type → utilities → animation.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

import './styles/variables.css';
import './styles/reset.css';
import './styles/typography.css';
import './styles/utilities.css';
import './styles/animations.css';
import './index.css';

// Tells CSS that JS is available, so reveal elements can start hidden.
document.documentElement.classList.add('js');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
