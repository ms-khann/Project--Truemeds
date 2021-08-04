import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginHandler, mobileNoHandler } from './../login/loginSlice';
import { Redirect } from "react-router-dom";

import './style.css';

export default function Login() {
    const dispatch = useDispatch();

    const redirect = useSelector((state) => state.login.redirect)
    const errorStatus = useSelector((state) => state.login.error)
    const eventHandler = async (e) => {
        e.preventDefault();
        await dispatch(loginHandler())
    }
    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (token) {
            window.location.href = '/article';
        }
    }, [])
    return (
        <div className="container">
            <div className="formWrap loginWrapper">
                <h2 className="mainHead">Login</h2>
                <form>
                    <div className="fieldGroup">
                        <input className="inputField" type="text" onKeyUp={(e) => dispatch(mobileNoHandler(e.target.value))} placeholder="Enter mobile no." />
                        {errorStatus === true ? <span className="error">Please enter correct mobile no.</span> : null}
                    </div>
                    <button className="submitBtn btn-sty" onClick={eventHandler}>Submit</button>
                    {redirect === true ? <Redirect to='/otp-validation' /> : null}
                </form>
            </div>
        </div>
    )
}