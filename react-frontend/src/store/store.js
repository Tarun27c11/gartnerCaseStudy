import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth';
import cartReducer from '../redux/cart';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
