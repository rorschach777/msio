import React from 'react';
import './_Intro.scss';
import LoginPanel from '../LoginPanel/LoginPanel';
import LogoCoral from '../../UI/LogoCoral/LogoCoral';
import ButtonLg from '../../UI/Buttons/ButtonLg/ButtonLg';
import posed from 'react-pose';

const Intro = (props) => {
    return (
     
        <LoginPanel>
            <div className="Intro">
                <LogoCoral/>
                <h3>MARK SWEITZER</h3>
                <ButtonLg click={props.click} text="Enter"/>
            </div>
        </LoginPanel>

    );
};

export default Intro;