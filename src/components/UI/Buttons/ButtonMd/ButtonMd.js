import React from 'react';
import './_ButtonMd.scss';
const ButtonMd = (props) => {
    return (
        <button 
        style={{backgroundColor: `${props.backgroundColor}`, color: `${props.color}`}} 
        className="ButtonMd" 
        onClick={(e)=>props.click(e)}
      
        >
            {props.text}
        </button>
    );
};
export default ButtonMd;