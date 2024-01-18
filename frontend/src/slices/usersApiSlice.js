import Product from '../components/Product';
import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  //this productApi Slice will help us hit endpoint that deal with products
  //builder object has methods like query which will help us hit the endpoint
  //buidler.query takes an object query with arrow func that returns an object

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: USERS_URL / login,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
