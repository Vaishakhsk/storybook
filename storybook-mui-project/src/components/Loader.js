import React from 'react';
import './Loader.css';
const Loader = () => {
    return (
        <div className="outer-container">
            <div className="container">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="logo-container">
                <img
                    src="https://i.pinimg.com/600x315/bf/f3/1f/bff31f367d88e2e910b246763c674481.jpg"
                    className="loaderLogo fade"
                    alt="Logo"
                    style={{ width: '75px', height: '40px', background:'#121212' }}
                />
            </div>
        </div>
    );
};

export default Loader;
