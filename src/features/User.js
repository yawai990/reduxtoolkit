import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import * as api from '../services';

const initialState ={
     userInfo : {},
}
const User = createSlice({
     name : 'user',
     initialState,

})