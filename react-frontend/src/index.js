import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Ensure you have your CSS here
import App from './App'; // Make sure App.js exists in the src folder

// Render the app to the root div in index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
