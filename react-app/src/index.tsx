// index.tsx

import React from 'react';
//import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import app from './App.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-ra4mhrpcnf2e1xtu.us.auth0.com"
    clientId="FZD4oquHkioFyUqUlUNV4CewMMEoWMlS"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);


reportWebVitals();
