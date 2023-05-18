import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from './app/store';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <HashRouter>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <App />
      </PersistGate>
    </Provider>
  </HashRouter>
  // </React.StrictMode>
)