import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './App.jsx';
import store from './store/index.js';
import AuthProvider from './context/auth/AuthProvider.jsx';
import SocketProvider from './context/socket/SocketProvider.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import resources from './locales/index.js';

const Init = async () => {
  const socket = io();

  const i18n = i18next.createInstance();

  await i18n.init({
    lng: 'ru',
    resources,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });
  return (
    <Provider store={store}>
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <SocketProvider socket={socket}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SocketProvider>
        </I18nextProvider>
      </React.StrictMode>
    </Provider>
  );
};

export default Init;
