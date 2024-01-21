import Product from '../components/Product';
import { PRODUCT_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  //this productApi Slice will help us hit endpoint that deal with products
  //builder object has methods like query which will help us hit the endpoint
  //buidler.query takes an object query with arrow func that returns an object

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCT_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
} = productApiSlice;
