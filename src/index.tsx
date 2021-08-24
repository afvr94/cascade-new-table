import React from 'react';
import ReactDOM from 'react-dom';
import { enableMapSet } from 'immer';
import './index.css';
import App from './App';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

enableMapSet();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
