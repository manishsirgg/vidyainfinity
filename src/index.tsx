import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import OneSignal from 'react-onesignal';

async function initOneSignal() {
  await OneSignal.init({
    appId: "fc73e175-c863-4d14-ae52-6876766384d7",
    notifyButton: {
      enable: false,
    },
    allowLocalhostAsSecureOrigin: true
  });
}

initOneSignal();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
