import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import {AppContextProvider} from "./app/context/AppContextProvider";
import {AuthContextProvider} from "./app/context/AuthContextProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <React.StrictMode>
          <AppContextProvider>
              <AuthContextProvider>
                  <App />
              </AuthContextProvider>
          </AppContextProvider>
      </React.StrictMode>
);

