import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style/index.scss"
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  
);

