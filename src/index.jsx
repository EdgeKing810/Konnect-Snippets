import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { LocalContextProvider } from './wrappers/LocalContext';
import App from './App.jsx';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 2000,
  offset: '30px',
  transition: transitions.SCALE,
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <LocalContextProvider>
      <Router>
        <App />
      </Router>
    </LocalContextProvider>
  </AlertProvider>,
  document.getElementById('root')
);
