import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import { configureStore } from './redux/configureStore'
import { Provider } from 'react-redux'

// 共通のURL
axios.defaults.baseURL = 'http://localhost:8000/api/ambassador'
// Cookieを用いた認証を許可
axios.defaults.withCredentials = true

// Reduxの設定
const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
