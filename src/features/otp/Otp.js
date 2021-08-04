import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { otpHandler, fetchSendOtp, fetchVerifyOtp, otpNumberHandler, timerCountHandler } from './../otp/otpSlice';
import { Redirect } from "react-router-dom";
import { selectState } from './../login/loginSlice';
import { authHandler } from './../../app/authSlice';
import loader from './../../loader.gif'



export default function Otp() {
    const dispatch = useDispatch();

    const token = window.localStorage.getItem('token')
    const mobile_no = useSelector(state => state.login.mobile_no);
    const otp_number = useSelector(state => state.otp.otp_number);
    const verifyOtpStatus = useSelector(state => state.otp.verifyOtpStatus);

    const status = useSelector((state) => state.otp.status)
    const verifyOtpError = useSelector((state) => state.otp.verifyOtpError)
    const timerCount = useSelector(state => state.otp.timerCount)

    useEffect(() => {
        if (mobile_no === '') {
            window.location.href = '/';
        } else if (status === 'idle' && token == undefined) {
            dispatch(fetchSendOtp(mobile_no))
        }
    }, [status, mobile_no, token])

    useEffect(() => {
        if (timerCount === 60) {
            var timer = setInterval(() => {
                dispatch(timerCountHandler())
            }, 1000)
        }
        if (timerCount == 0) {
            clearInterval(timer)
            window.location.href = '/';
        }
    }, [timerCount]);




    const eventHandler = async (e) => {
        e.preventDefault();
        dispatch(otpNumberHandler())

        console.log('verifyOtpError', verifyOtpError);
        if (verifyOtpError === false) {
            dispatch(fetchVerifyOtp({ mobile_no, otp_number }));
        }
    }
    return (
        <div className="container">
            {status === 'loading' ? <div className="loader"><img src={loader} alt="not found" /></div> : null}
            <div className="formWrap loginWrapper">
                <h2 className="mainHead">Verify Mobile Number</h2>
                <form className="loginWrapper">
                    <div className="fieldGroup">
                        <div className="timer">OTP Expire In: <span>00:{timerCount}</span></div>
                        <input className="inputField" type="text" placeholder="Enter OTP no." onKeyUp={(e) => dispatch(otpHandler(e.target.value))} />
                        {verifyOtpError === true ? <span className="error">Maximum length is 4.</span> : null}
                    </div>
                    <button className="submitBtn btn-sty" onClick={eventHandler}>Submit</button>
                    {verifyOtpStatus === 'succeeded' ? <Redirect to='/article' /> : null}
                </form>
            </div>
        </div>
    )
}