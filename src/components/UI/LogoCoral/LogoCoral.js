import React from 'react';
import LogoImg from '../../../assets/images/logo-coral.svg'
import './_LogoCoral.scss';
const LogoCoral = (props) => {
    return (
        <div className="LogoCoral" onClick={props.click}>
            <img src={LogoImg}/>
        </div>
    );
};

export default LogoCoral;