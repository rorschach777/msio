import React from 'react';
import ButtonLg from '../../UI/Buttons/ButtonLg/ButtonLg';
import Input from '../../UI/Input/Input';
import './_AccessKey.scss';
const AccessKey = (props) => {
    return (
        <div className="AccessKey">
            <div className="AccessKey__header">
                
                <h1><span uk-icon="icon: unlock; ratio:1.5" ></span>Access Key</h1>
            </div>
        
            <Input type="text" placeholder='Access Key'/>
            <ButtonLg text='Enter'/>
            <h6 uk-tooltip="title: You should have received a login key that will grant you access to this part of the site; pos: bottom-center">What's This?</h6>
        </div>
    );
};
export default AccessKey;