import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../services';

const initialState = {
     products :[],
     loading : true,
     isSuccess : false,
     errMessage : ''
};

export const getAllProducts = createAsyncThunk('products', arg =>{
     try {
          const data = api.getProducts()
          .then(resp =>{
               const { products } = resp.data;
               return products;
          });

          return data;
     } catch (error) {
          return error;
     }
})

const Products = createSlice({
     name : 'products',
     initialState,
     extraReducers : {
          [getAllProducts.pending] : (state, action ) =>{
               state.loading = true,
               state.isSuccess = false;
               state.products = [];
          },
          [getAllProducts.fulfilled] : (state, { payload }) => {
               state.loading = false,
               state.isSuccess = true;
               state.products = payload;
          },
          [getAllProducts.rejected]:(state,action)=>{
               state.loading = true,
               state.isSuccess = false;
               state.products = [];
          }
     }
})
export default Products.reducer;
