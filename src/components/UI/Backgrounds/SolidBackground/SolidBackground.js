import React from 'react';
import './_SolidBackground.scss';
import posed from 'react-pose';
const SolidBkg = posed.div({
    show: {
        opacity: .99, 
        applyAtStart: {display: 'block'}
    },
    hide: {
        opacity: 0,
        applyAtEnd: {display: 'hide'}
    }
})
const SolidBackground = (props) => {
    return (
        <SolidBkg pose={props.solidBackground ? 'show' : 'hide'} className="Solid-Background">
            
        </SolidBkg>
    );
};

export default SolidBackground;