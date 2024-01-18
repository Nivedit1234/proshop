import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSlice from './slices/cartSlice';
//import authSlice from './slices/authSlice';
//import { usersApiSlice } from './slices/userApiSlice';
//import authReducer from './slices/authSlice';
//import cartReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    //auth: authSlice,
    //[authSlice.reducerPath]: authSlice.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // apiSlice.middleware.concat(getDefaultMiddleware()),
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
