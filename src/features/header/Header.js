import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authHandler, selectState } from './../../app/authSlice';

export default function Header() {
    // const isUserAuthenticated = useSelector(selectState)
    const isUserAuthenticated = useSelector(state => state.otp.authenticated)
    console.log(isUserAuthenticated);
    const logoutHander = () => {
        window.localStorage.removeItem('token');
        window.location.href = '/'
    }

    return (
        <header className="container-fluid">
            <div className="container">
                <Link to="/">
                    <h1 className="logo">
                        <img src="https://www.truemeds.in/static/media/truemedslogosvg.17e1776a.svg" alt="logo" />
                    </h1>
                </Link>
                <Link to="/cart">
                    <div className="logout">
                        {isUserAuthenticated === true ? <button className="btn-sty-second" onClick={logoutHander}>Logout</button> : null}
                    </div>
                </Link>
            </div>
        </header>
    );
}
