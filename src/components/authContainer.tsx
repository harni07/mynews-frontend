import React from 'react';
import background from '../assets/images/background.jpg';
import { Outlet } from "react-router-dom";

const AuthContainer: React.FC = () => {
    return (
        <div className="login-container">
            <div className="image-container">
                <img src={background} alt="Background"/>
            </div>
            <div className="form-container">
                <div className="box">
                    <div className="form">
                        <Outlet /> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthContainer;