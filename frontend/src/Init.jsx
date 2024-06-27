import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './App.jsx';
import store from './store/index.js';
import AuthProvider from './context/auth/AuthProvider.jsx';
import SocketProvider from './context/socket/SocketProvider.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const Init = () => {
  const socket = io();

  return (
    <Provider store={store}>
      <React.StrictMode>
          <SocketProvider socket={socket}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SocketProvider>
      </React.StrictMode>
    </Provider>
  );
};

export default Init;
