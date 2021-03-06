import React from 'react';

import './_TextArea.scss';
const TextArea = (props) => {
    return (
        <div className="TextArea">
            <label id={`${props.id}-name-label`}>{props.label}</label>
            <textarea 
                className={props.isvalid ? 'valid' : ''}
                placeholder={props.placeholder}
                isvalid={props.isvalid}
                id={props.id}
                type={props.type}
                onChange={(e)=>props.onChange(e, props.data)}
            />
             <label id={`${props.id}-error-label`} className="TextArea__error-message">{props.errorVisible ? props.errorMessage : null}</label>
        </div>
    );
};

export default TextArea;