import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../services';

const initialState = {
     bestseller :[],
     loading : true,
     isSuccess : false,
     errMessage : ''
};

export const getBestSeller = createAsyncThunk('bestsellers', arg =>{
     try {
          const data = api.bestSellersProducts()
          .then(resp =>{
               const { bestseller } = resp.data;
               return bestseller;
          });

          return data;
     } catch (error) {
          return error;
     }
})

const bestSellerProducts = createSlice({
     name : 'best sellers',
     initialState,
     extraReducers : {
          [getBestSeller.pending] : (state, action ) =>{
               state.loading = true,
               state.isSuccess = false;
               state.bestseller = [];
          },
          [getBestSeller.fulfilled] : (state, { payload }) => {
               state.loading = false,
               state.isSuccess = true;
               state.bestseller = payload;
          },
          [getBestSeller.rejected]:(state,action)=>{
               state.loading = true,
               state.isSuccess = false;
               state.bestseller = [];
          }
     }
})
export default bestSellerProducts.reducer;
