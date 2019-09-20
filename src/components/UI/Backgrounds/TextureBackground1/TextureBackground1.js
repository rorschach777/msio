import React from 'react';
import './_TextureBackground1.scss';
import posed from 'react-pose';
const TextBkg = posed.div({
    show: {
        opacity: 1,
        applyAtStart: {display: 'block'}
    },
    hide: {
        opacity: .05,

    }
})
const textureBackground1 = (props) => {
    return (
        <TextBkg  style={{ height: props.height}} pose={props.solidBackground ? 'show' : 'hide'} className="TextureBackground1">
            {props.children}
        </TextBkg>
    );
};

export default textureBackground1;