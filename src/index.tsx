import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AllRoutes } from './config/routes.tsx';
import { Provider } from 'react-redux';
import App from './App.tsx';
import Sidebar from './Components/Sidebar.js';
import store from './stores/store.js';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={AllRoutes} />
    </Provider>
  </React.StrictMode>
);
