import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { push } from 'react-router-redux';
import axios from 'axios';


const initialState = {
    auth: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        authHandler: (state, action) => {
            state.auth = true;
        }
    }
});

export const { authHandler } = authSlice.actions;

export const selectState = (state) => state.auth.state;

export default authSlice.reducer;
