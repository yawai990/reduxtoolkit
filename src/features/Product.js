import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../services';

const initialState = {
     products :[],
     pagination : 0,
     curPage : 1,
     loading : true,
     isSuccess : false,
     errMessage : ''
};

export const getAllProducts = createAsyncThunk('products', arg =>{
     const { pagi,price,brand, category } = arg;

     try {
          const data = api.getProducts(pagi,price,brand, category)
          .then(resp =>{               
               return resp.data;
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
               state.pagination = 0;
               state.curPage = 1;
          },
          [getAllProducts.fulfilled] : (state, { payload }) => {
               const { products,pagination, pageNum } = payload;
               state.curPage = Number(pageNum);
               state.loading = false,
               state.isSuccess = true;
               state.products = products;
               state.pagination = pagination;
          },
          [getAllProducts.rejected]:(state,action)=>{
               state.loading = true,
               state.isSuccess = false;
               state.products = [];
               state.pagination = 0;
               state.curPage = 1;
          }
     }
})
export default Products.reducer;
