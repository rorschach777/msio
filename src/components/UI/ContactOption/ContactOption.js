import React from 'react';
import './_ContactOption.scss'
const ContactOption = (props) => {
    return (
        <div className="Contact-Option">
            <span uk-icon={props.icon}></span><span>{props.text}</span>
        </div>
    );
};

export default ContactOption;