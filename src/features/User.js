import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import * as api from '../services';

const initialState ={
     loading : false,
     userToken : null,
     error : null,
     success : false,
     userInfo : {},
};

export const logIn = createAsyncThunk('users/login', async(payload, thunkAPI) => {
    const userData = await api.Login(payload)
     .then(resp => {
          const { userLoggedIn }  = resp.data;
           return userLoggedIn;

     })
     if(!userData){
          thunkAPI.rejectWithValue('user log in fail')
     }
     return userData;
});

const User = createSlice({
     name : 'user',
     initialState,
     extraReducers : builder => {
          builder.addCase(logIn.pending,(state, { payload }) => {
               state.loading = true
               console.log('pending', state, payload
               )
          })
          .addCase(logIn.fulfilled,(state, { payload }) => {
               const { token, user } = payload;
               sessionStorage.setItem('token',token);
               localStorage.setItem('userInfo',JSON.stringify(user));
               state.loading = false;
               state.userInfo = payload;
               state.userToken = token;
               state.success = true;
          })
          .addCase(logIn.rejected, (state, { payload  }) => {
               state.loading = false,
               state.success = false
          })
     }
});

export default User.reducer;