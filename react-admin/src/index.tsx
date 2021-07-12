// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import { configureStore } from './redux/configureStore'
import { Provider } from 'react-redux';

axios.defaults.baseURL = 'http://localhost:8000/api/admin/'
axios.defaults.withCredentials = true

// store
const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    {/* storeをコンポーネントに渡すため、Providerを定義 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
