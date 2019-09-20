import React from 'react';
import LogoImg from '../../../assets/images/logo-light.svg'
import './_Logo.scss';
const Logo = (props) => {
    return (
        <div className="Logo" onClick={props.click}>
            <img src={LogoImg}/>
        </div>
    );
};

export default Logo;