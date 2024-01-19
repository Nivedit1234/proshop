import { createSlice } from '@reduxjs/toolkit';

import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItems: [],
      shippingAddress: {
        address: '',
        city: '',
        postalCode: '',
        country: '',
      },
      paymentMethod: 'PayPal',
      // itemsPrice: 0,
      // taxPrice: 1,
      // shippingPrice: 0,
      // totalPrice: 0,
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id); //check to see if the item is already in the cart
      //if exitsItem  is true then we will just update the quantity; //existing item is the existing item as
      //state.cartItems = [
      //   { _id: 1, name: 'Product A', quantity: 2 },
      //   { _id: 2, name: 'Product B', quantity: 1 },
      //   { _id: 3, name: 'Product C', quantity: 3 },
      // ];

      // const item = { _id: 2, name: 'Product B', quantity: 2 }; item to be added;

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
