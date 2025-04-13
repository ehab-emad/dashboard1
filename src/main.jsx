import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/rootReducer';
import App from './App';
import './index.css';

// Debug: Log Redux store creation
console.log('[DEBUG] Initializing Redux store...');

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ serializableCheck: false }), // Disable for Firebase
});

// Debug: Verify store state
store.subscribe(() => {
  console.log('[DEBUG] Redux state:', store.getState());
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);