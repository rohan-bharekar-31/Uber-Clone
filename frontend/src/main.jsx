import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { BrowserRouter } from 'react-router-dom';
import UserContext from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import CaptainContext from './context/CaptainContext';
import SocketContext from './context/SocketContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <CaptainContext>
    <UserContext>
      <SocketContext>
        <BrowserRouter>
          <ToastContainer />
          <App />
        </BrowserRouter>
      </SocketContext>
    </UserContext>
  </CaptainContext>
);
