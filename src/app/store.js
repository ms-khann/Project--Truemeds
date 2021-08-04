import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import otpReducer from '../features/otp/otpSlice';
import articlesReducer from '../features/articles/articlesSlice';
import authReducer from '../app/authSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    otp: otpReducer,
    articles: articlesReducer,
    // auth: authReducer
  }
});
