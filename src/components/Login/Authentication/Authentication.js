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
    // INPUT FIELDS
    const authenticationTypeFields = () => {
        // Safari / IE fix --- These browsers don't care about mapping key order.
        // this forces them to retain input order on form. 
        formElementsArr.sort((a, b)=>{
            return a.config.order - b.config.order
        })
        return (
            formElementsArr.map((cur, idx) => {
               
                if (!props.rdxAuthState.resetPassword && cur.config.inputConfig.signInVisible){
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
                else if (props.signUp && cur.config.inputConfig.signUpVisible && cur.config.inputConfig.signUpVisible){
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
                else if ((props.rdxAuthState.resetPassword && !props.rdxAuthState.resetPasswordConfirmation) && cur.config.inputConfig.passwordReset){
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
                else if ((props.rdxAuthState.resetPassword && props.rdxAuthState.resetPasswordConfirmation) && cur.config.inputConfig.passwordConfirmation){
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
    // BUTTON
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
        // Password Reset
        else if ((!props.signIn || !props.signUp) && (!props.rdxAuthState.resetPasswordConfirmation && props.rdxAuthState.resetPassword)){
            return (
                <ButtonLg id={'login-btn'} disabled={props.rdxAuthState.authForm.emailAddress.isValid && props.rdxAuthState.authForm.emailAddress.touched ? null : true} click={(e) => props.sendResetPassword(e, props.rdxAuthState.authForm.emailAddress.value)} text='Send Password Reset Email' /> 
            )
        }
        // Password Confirm Change
        else if ((!props.signIn || !props.signUp) && (props.rdxAuthState.resetPasswordConfirmation && props.rdxAuthState.resetPassword)){
            return (
                <ButtonLg id={'login-btn'} disabled={props.rdxAuthState.authForm.confirmPassword.isValid && props.rdxAuthState.authForm.confirmPassword.touched ? null : true} click={(e) => props.confirmResetPassword(e, props.rdxAuthState.resetPasswordUser.userId, props.rdxAuthState.authForm.confirmPassword.value)} text='Reset Password' /> 
            )
        }
        else if (!props.formValid){
            return (
                <ButtonLg id={'login-btn'} disabled={'disabled'}  text={props.signIn ? 'Sign In' : 'Sign Up'} />
            )
        }
    }
    // BOTTOM NAVIGATION COMPONENT
    const bottomNav = () => {
        if (props.signUp){
            return(
                <div className="bottom-navigation">
                    <h6 id="access-key-tool-tip" uk-tooltip="title: To use this part of the site, you should have recieved an access key that is required to sign up.">Access Key?</h6>
                    {!props.rdxAuthState.resetPassword ? 
                    <h6 onClick={props.toggleResetPassword}>
                        Reset Password
                    </h6>
                    : null }
                
                </div>
            )
        }
    }
    // Reset Email Message 
    const resetPasswordMessage = () => {
        let message
        if (props.rdxAuthState.resetPasswordEmailSent && props.rdxAuthState.resetPasswordMessageShow) {
            message = 'You provided a valid email address. Please check your email address for a reset link.';
        }
        else if (!props.rdxAuthState.resetPasswordEmailSent && props.rdxAuthState.resetPasswordMessageShow){
            message = 'Oh no! You provided an un-registered email address. You can sign up with this email address as a new user.';
        }
        else if (!props.rdxAuthState.resetPasswordMessageShow){
            message = '';
        }
        return (
            <p>
                {message}
            </p>
        )
    }
    // MAIN AUTHENTICATION LAYOUT
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
        // NOT LOGGED, NO SIGN UP SUCCESS
        else if ((!props.loggedIn && !props.signUpError && !props.signInError ) && (!props.signUpSuccess || props.signIn) && !props.authIntro && !props.rdxAuthState.resetPassword) {
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
                    {bottomNav()}
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
        else if (!props.loggedIn && props.rdxAuthState.resetPassword){
            return(
                <Aux>
                <div className="Authentication__header">
                    <div className="Authentication__header__left">
                    <h1>{!props.rdxAuthState.resetPasswordConfirmation ? 'Reset' : 'Confirm'}</h1>
                    </div>
                    <div className="Authentication__header__right">
                        <div className="Authentication__header__right__con">
                            <ul >
                                <li onClick={(e) => props.toggleProp(e, props.authForm,  'signUp')} className={props.signUp ? '' : null} ><a id="auth-method-sign-up" href="#">Sign Up</a></li>
                                <li onClick={(e) => props.toggleProp(e, props.authForm, 'signIn')}
                                className={props.signIn ? '' : null} 
                                ><a id="auth-method-sign-in"   href="#">Sign In</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="Authentication__form">
                    {authenticationTypeFields()}
                </div>
                <div className="Authentication__reset-message">
                    {resetPasswordMessage()}
                </div>
                {buttonType()}
                {bottomNav()}
            </Aux>
            )
        }
    }
    return (
        // RETURN THE AUTHENTICATION LAYOUT
        <div className='Authentication'>
            {authenticate()}
        </div>
    );
};
export default Authentication;