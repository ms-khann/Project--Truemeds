import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    mobile_no: '',
    error: false,
    redirect: false
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        loginHandler: (state) => {
            
            state.status = 'loading';

            const regEx = /^[6-9][0-9]{9}$/

            if (state.mobile_no.match(regEx) ) {
                state.error = false;
                state.redirect = true;

            } else {
                state.error = true;
            }
        },
        mobileNoHandler: (state, action) => {
            state.mobile_no = action.payload;
        }
    }
});

export const { loginHandler, mobileNoHandler } = loginSlice.actions;

export const selectState = (state) => state.login.state;

export default loginSlice.reducer;
