import React from 'react';
import "./_IntroFull.scss";
import {NavLink}  from 'react-router-dom';
import ButtonLg from '../UI/Buttons/ButtonLg/ButtonLg';
import Logo from '../UI/Logo/Logo';
import Con1080 from '../UI/Con/Con1080/Con1080'
const IntroFull = (props) => {
    return (
        <Con1080>
            <div className="IntroFull">
                <Logo/>
                <h1>Resume &amp; Portfolio Samples</h1>
                <p>Thank you for visiting this site {props.firstName}. Please use the navigation to view resume and samples.</p>
                <NavLink to="/resume"><ButtonLg text="Continue"/></NavLink>
            </div>
        </Con1080>
    );
};

export default IntroFull;