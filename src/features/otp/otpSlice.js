import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { push } from 'react-router-redux';
import axios from 'axios';
import { fetchArticles } from '../articles/articlesSlice';


const initialState = {
    status: 'idle',
    verifyOtpStatus: 'idle',
    otp_number: '',
    error: false,
    verifyOtpError: false,
    authenticated: false,
    timerCount: 60
};

export const fetchSendOtp = createAsyncThunk('otp/fetchSendOtp', async (payload) => {
    const options = {
        method: 'POST',
        headers: { 'transactionId': 'react_interview' },
        url: `https://stage-services.truemeds.in/CustomerService/sendOtp?mobileNo=${payload}`,
    };
    axios(options)
        .then(function response(res) {
            // The value we return becomes the `fulfilled` action payload
            return response.data;
    }).catch(function error(err) {
        console.log(err);
    })
})

export const fetchVerifyOtp = createAsyncThunk('otp/fetchVerifyOtp', async (payload) => {
    console.log('dddddd');
    const options = {
        method: 'POST',
        headers: { 'transactionId': 'react_interview' },
        url: `https://stage-services.truemeds.in/CustomerService/verifyOtp?mobileNo=${payload.mobile_no}&otp=${payload.otp_number}&de
viceKey=abcd&isIos=false&source=react_interview`,
    };
    const fetchData = await axios(options)
    return fetchData.data;
})

export const otpSlice = createSlice({
    name: 'login',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        otpNumberHandler: (state, action) => {
            const regEx = /^[0-9]{4}$/

            if (state.otp_number.match(regEx)) {
                state.verifyOtpError = false;
            } else {
                state.verifyOtpError = true;
            }
        },
        otpHandler: (state, action) => {
            state.otp_number = action.payload;
        },
        authHandler: (state, action) => {
            state.authenticated = true;
        },
        timerCountHandler: (state) => {
            state.timerCount = state.timerCount - 1;
        }
    },
    extraReducers: {
        [fetchSendOtp.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchSendOtp.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
        },
        [fetchSendOtp.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [fetchVerifyOtp.pending]: (state, action) => {
            state.verifyOtpStatus = 'loading'
        },
        [fetchVerifyOtp.fulfilled]: (state, action) => {
            state.verifyOtpStatus = 'succeeded'
            window.localStorage.setItem('token', action.payload.Response.access_token)
            state.authenticated = true;
        },
        [fetchVerifyOtp.rejected]: (state, action) => {
            state.verifyOtpStatus = 'failed'
            // state.verifyOtpError = action.error.message
        }
    }
});

export const { otpHandler, authHandler, otpNumberHandler, timerCountHandler } = otpSlice.actions;

export const selectState = (state) => state.login.state;

export default otpSlice.reducer;
