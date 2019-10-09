import React from 'react';
import './_Authentication.scss';
import Input from '../../UI/Input/Input';
import ButtonLg from '../../UI/Buttons/ButtonLg/ButtonLg';
import Aux from '../../Hoc/Aux/Aux';
import { NavLink } from 'react-router-dom';
const formElements = () => {
    
}
const Authentication = (props) => {
    let formElementsArr = [];

    for (let key in props.authForm) {
        formElementsArr.push({
            id: key,
            config: props.authForm[key]
        })
    }
    const authenticationTypeFields = () => {
        // Safari / IE fix --- These browsers don't care about mapping key order.
        // this forces them to retain input order on form. 
        formElementsArr.sort((a, b)=>{
            return a.config.order - b.config.order
        })
        return (
            formElementsArr.map((cur, idx) => {
                if (props.signUp && cur.config.inputConfig.signUpVisible){
                    return (
                        <Input
                            id={cur.id}
                            key={idx}
                            label={cur.config.inputConfig.label}
                            layout={cur.config.inputConfig.fieldLayoutClass}
                            errorMessage={cur.config.inputConfig.errorMessage}
                            errorVisible={cur.config.inputConfig.errorVisible}
                            isvalid={cur.config.isValid}
                            placeholder={cur.config.placeholder}
                            onChange={props.onChange}
                            data={props.rdxAuthState}
                        />
                    )
                }
                else if (cur.config.inputConfig.signInVisible){
                    return (
                        <Input
                            id={cur.id}
                            key={cur.config.order}
                            label={cur.config.inputConfig.label}
                            layout={cur.config.inputConfig.fieldLayoutClass}
                            errorMessage={cur.config.inputConfig.errorMessage}
                            errorVisible={cur.config.inputConfig.errorVisible}
                            isvalid={cur.config.isValid}
                            placeholder={cur.config.placeholder}
                            onChange={props.onChange}
                            data={props.rdxAuthState}
                        />
                    )
                }
            })
        )
     
    }
 
    const buttonType = () => {
        if (props.signUp && props.formValid){
            return (
                // <ButtonLg id={'login-btn'} disabled={null} click={(e) => {props.submit(e, props.rdxAuthState);props.signUpSuccessEmail(e) }} text={props.signIn ? 'Sign In' : 'Sign Up'} /> 
                <ButtonLg id={'login-btn'} disabled={null} click={(e) => {props.submit(e, props.rdxAuthState)}} text={props.signIn ? 'Sign In' : 'Sign Up'} /> 
            )
        }
        if (props.signIn && props.formValid){
            return (
                <ButtonLg id={'login-btn'} disabled={null} click={(e) => {props.submit(e, props.rdxAuthState) }} text={props.signIn ? 'Sign In' : 'Sign Up'} /> 
            )
        }
        else if (!props.formValid){
            return (
                <ButtonLg id={'login-btn'} disabled={'disabled'}  text={props.signIn ? 'Sign In' : 'Sign Up'} />
            )
           
        }
        
     
    }
    const authenticate = () => {
        // LOGGED IN, NO ERRORS - WELCOME
        if (props.loggedIn && !props.signInError && !props.signUpError) {
            return (
                <div className="Authentication__welcome">
                    <h1>Welcome {props.userFirstName}</h1>
                    <NavLink to="/resume"><ButtonLg text="Go Home" /></NavLink>
                </div>
            )
        }
        // NOT LOGGED IN AND NO SIGN UP SUCCESS
        else if ((!props.loggedIn && !props.signUpError && !props.signInError ) && (!props.signUpSuccess || props.signIn) && !props.authIntro){
            return (
                <Aux>
                    <div className="Authentication__header">
                        <div className="Authentication__header__left">
                            <h1>{props.signIn ? 'Sign In' : 'Sign Up'}</h1>
                        </div>
                        <div className="Authentication__header__right">
                            <div className="Authentication__header__right__con">
                                <ul data-uk-tab>
                                    <li onClick={(e) => props.toggleProp(e, props.authForm,  'signUp')} className={props.signUp ? 'uk-active' : null} ><a id="auth-method-sign-up" href="#">Sign Up</a></li>
                                    <li onClick={(e) => props.toggleProp(e, props.authForm, 'signIn')} className={props.signIn ? 'uk-active' : null}><a id="auth-method-sign-in"   href="#">Sign In</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="Authentication__form">
                        {authenticationTypeFields() }
                    </div>
                    {buttonType()}
                    {props.signUp ? <h6 id="access-key-tool-tip" uk-tooltip="title: To use this part of the site, you should have recieved an access key that is required to sign up.; pos: bottom-center">Access Key?</h6> : null}
                </Aux>
            )
        }
        // SIGN UP ERROR
        else if (props.signUpError && !props.signInError){
            return (
                <Aux>
                    <div className="Authentication__signup-error">
                        <div>
                            <h1>Oh, Snap!</h1>
                            <h4>There was an issue signing up</h4>
                            <p>It looks like either you've already signed up, or your access key wasn't good :(</p>
                            <ButtonLg text="Ok, Got It!" click={(e)=>{props.toggleError(e, 'signUpError', false)}}></ButtonLg>
                        </div>
                    </div>
                </Aux>
            )
        }
        // SIGN IN ERROR
        else if (props.signInError && !props.signUpError){
            return (
                <Aux>
                    <div className="Authentication__signup-error">
                        <div>
                            <h1>Oh, Snap!</h1>
                            <h4>There was an issue signing in</h4>
                            <p>Either your email or password didn't match... Before signing in, please make sure that you are signed up. You'll need a valid access key in order to sign up.</p>
                            <ButtonLg text="Ok, Got It!" click={(e)=>{props.toggleError(e,  'signInError', false)}}></ButtonLg>
                        </div>
                    </div>
                </Aux>
            )
        }
        // SIGN UP SUCCESS
        else if (props.signUpSuccess && props.signUp){
            return (
                <Aux>
                    <div className="Authentication__signup-error">
                        <div>
                            <h1>Sign Up Success!</h1>
                            <h4>You are all signed up</h4>
                            {/* <p>You must sign in, with your email and password.</p>
                           <ButtonLg 
                           id="auth-method-sign-in"
                           text="Continue"
                           click={(e)=>{props.toggleProp(e, props.authForm, 'signIn'); props.signUpSuccessEmail()}}
                            ></ButtonLg> */}
                        </div>
                    </div>
                </Aux>
            )
        } 
        // TOKEN EXP
        else if (!props.loggedIn && props.tokenExpired){
            return (
                <Aux>
                    <div className="Authentication__signup-error">
                        <div>
                            <h1>Please Login</h1>
                            <h4>Your session has expired</h4>
                            <p>You have been away a while, so you have been automatically logged out. Please login again to continue.</p>
                           <ButtonLg 
                           id="session-expired"
                           text="Go Home"
                           click={(e)=>{props.toggleMainProp(e, 'tokenExpired')}}
                            ></ButtonLg>
                        </div>
                    </div>
                </Aux>
            )
        } 
    }
    return (
        <div className='Authentication'>
            {authenticate()}
        </div>
    );
};
export default Authentication;