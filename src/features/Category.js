import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../services';

export const fetchCategory = createAsyncThunk('category', () =>{
     return api.allCategories()
     .then(resp =>{
          const { status, categories } = resp.data;
          return categories;
     })
});

const initialState = {
     categories : [],
     cat_loading : true,
     isSuccess : false
}
const category = createSlice({
     name : 'category',
     initialState,
     extraReducers : builder => {
          builder.addCase(fetchCategory.fulfilled, ( state, { payload }) => {
               state.categories = payload;
               state.cat_loading = false;
               state.isSuccess = true;
          });

     }
});


export default category.reducer;