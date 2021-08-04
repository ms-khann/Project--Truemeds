import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { push } from 'react-router-redux';
import axios from 'axios';


const initialState = {
    status: 'idle',
    data: []
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (token) => {
    const options = {
        method: 'POST',
        url: `https://stage-services.truemeds.in/ArticleService/getArticleListing`,
        headers: {
            'Authorization': `Basic ${token}`
        }
    };

    const fetchData = await axios(options)
    return fetchData.data;
})

export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        otpHandler: (state, action) => {
            state.otp_number = action.payload;
        }
    },
    extraReducers: {
        [fetchArticles.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchArticles.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload.result;
        },
        [fetchArticles.rejected]: (state, action) => {
            state.status = 'failed'
            state.verifyOtpError = action.error.message
        }
    }
});

export const { otpHandler } = articlesSlice.actions;

export const selectState = (state) => state.login.state;

export default articlesSlice.reducer;
