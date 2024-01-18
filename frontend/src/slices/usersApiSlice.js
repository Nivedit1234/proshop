import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  //this productApi Slice will help us hit endpoint that deal with products
  //builder object has methods like query which will help us hit the endpoint
  //buidler.query takes an object query with arrow func that returns an object

  endpoints: (builder) => ({
    login: builder.mutation({
      //instead of writing query we are authenticating and making a post request so builder.mutation
      query: (data) => ({
        ////data parameter is holding the data to be sent for auth

        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      //we need one logout function here to hit users/logout to destroy the cookie in the backed server
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;
