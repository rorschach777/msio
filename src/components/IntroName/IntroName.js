import React from 'react';
import './_IntroName.scss';
import Logo from '../../components/UI/Logo/Logo';
const IntroName = (props) => {
    return (
        <div className="IntroName">
            <div className="side side--front">
                <Logo/>
            </div>
            <div className="side side--back">
                <h1>MARKSWEITZER.<span>IO</span></h1>
            </div>
        </div>
    );
};
export default IntroName;