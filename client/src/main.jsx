import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './AppRoutes.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import GlobalStyles from './styles/globalStyles.js';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>

    <GlobalStyles />
    <ToastContainer
      theme="dark"
      closeOnClick
      style={{
        opacity: 0.8,
      }}
    />
  </React.StrictMode>,
);
