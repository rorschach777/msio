import React from 'react';
import Input from '../UI/Input/Input';
import Intrologo from '../../assets/images/intro-logo.svg';
import Con1080 from '../UI/Con/Con1080/Con1080';
import ButtonMd from '../UI/Buttons/ButtonMd/ButtonMd';
import Aux from '../Hoc/Aux/Aux';
import {Redirect} from 'react-router-dom'
import './_Login.scss';
const Login = (props) => {
    let content = 
 
        <Con1080>
            <div class="Login">
                <img alt="" src={Intrologo}/>
                <Input id="access-key" place='Access Key'/>
                <ButtonMd text='Enter' backgroundColor='#FF5E7F' color='#e7e7e7' click={props.loginFn}/>
            </div>
        </Con1080>
    
    return (
       <Aux>
            {!props.loggedIn ? content : <Redirect to="/cover-letter"/>}
       </Aux>
    );
};

export default Login;