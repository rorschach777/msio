import React from 'react';

import './_ButtonLg.scss';
const ButtonMd = (props) => {
    return (
        <button 
        type="button"
        disabled={props.disabled}
        id={props.id}
        style={{backgroundColor: `${props.backgroundColor}`, color: `${props.color}`}} 
        className="ButtonLg" 
        onClick={props.click}
        >
            {props.text}
        </button>
    );
};
export default ButtonMd;