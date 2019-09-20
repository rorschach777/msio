import React from 'react';

import './_Input.scss';

const Input = (props) => {
    return (
        <div className={`Input ${props.layout}`}>
            <label id={`${props.id}-name-label`}>{props.label}</label>
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={(e)=>props.onChange(e, props.data)}
                className={props.isValid ? ` valid` : ` invalid`}
            />
            <label id={`${props.id}-error-label`} className="Input__error-message">{props.errorVisible ? props.errorMessage : null}</label>
        </div>
     

    );
}
export default Input;