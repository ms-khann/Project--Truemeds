import React, { useEffect } from 'react';
import './App.css';
import Login from './features/login/Login';
import Header from './features/header/Header';
import Otp from './features/otp/Otp';
import { useDispatch } from 'react-redux';
// import { authHandler } from './app/authSlice';
import { authHandler } from './features/otp/otpSlice';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Article from './features/articles/Articles';
import Footer from './features/footer/Footer';

function App() {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem('token')
  useEffect(() => {
    if (token != null) {
      dispatch(authHandler())
    }
  }, [token])
  return (
    <div className="page">
      <Router>
        <Header />
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route path="/otp-validation">
              <Otp />
            </Route>
            <Route path="/article">
              <Article />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
