import React from 'react';
import './_LoginPanel.scss';
const LoginPanel = (props) => {
    return (
        <div className="LoginPanel">
            {props.children}
        </div>
    );
};

export default LoginPanel;