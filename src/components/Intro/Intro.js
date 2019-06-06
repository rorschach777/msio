import React from 'react';
import './_Intro.scss';
import Intrologo from '../../assets/images/intro-logo.svg';
import IntroConstruction from '../../assets/images/intro-un-con.svg';
const Intro = () => {
    return (
        <div className="Intro">
            <div className="Intro__side Intro__side--front">
                <img alt="" src={Intrologo}/>
            </div>
            <div className="Intro__side Intro__side--back">
                <img alt="" src={IntroConstruction}/>
            </div>
        </div>
    );
};

export default Intro;