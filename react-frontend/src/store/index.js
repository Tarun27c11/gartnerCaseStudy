import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth'; 
import cartReducer from './cart'; // If you have an auth slice

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, 
    cart: cartReducer, // Add more reducers as needed
  },
});

export default store;