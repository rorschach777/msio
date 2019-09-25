import React, { Component } from 'react';
import Authentication from '../../components/Login/Authentication/Authentication';
import * as reduxActions from '../../store/actions/index';
import axiosFB from '../../axios/axios'

import {connect} from 'react-redux'
class AuthenticationCon extends Component {
    clearError=(e,target)=>{
        e.preventDefault();
        let property = `${target}Error`
        this.setState(prevState=>({
            [property]: false
        }), this.showState)
    }
    signUpSuccessEmail = () => {
        let c = this.props.rdxAuthFormObj.accessKey.value.split('_')
        let company = c[c.length -1]
        let companyCapitalized = company.charAt(0).toUpperCase() + company.slice(1);
  
        const email = {
            recipient: `${this.props.rdxAuthFormObj.emailAddress.value}`,
            firstName: `${this.props.rdxAuthFormObj.firstName.value}`,
            companyName: companyCapitalized,
            sender: 'mark.sweitzer@marksweitzer.io',
            subject: 'Mark Sweitzer | Sign Up Success',
            text: 'Here is some text.'
        }
  
        fetch(`https://ec2-18-188-237-84.us-east-2.compute.amazonaws.com:80/login?recipient=${email.recipient}&firstName=${email.firstName}&companyName=${email.companyName}&sender=${email.sender}&topic=${email.subject}&html=${email.html}&text=${email.text}&key=${this.props.rdxAuthState.sgKey}`) //query string url
            .catch(err => console.error(err))
    }
    componentDidMount(){

        this.props.rdxGetAccessKeys();
        this.props.rdxSgKey();
    }
    render() {
        return (
            <div>
                <Authentication
                    accessKeyValid={this.props.rdxAccessKeyValid}
                    setAuthMethodButtons={this.setAuthMethodButtons}
                    /// REDUX 
                    rdxAuthState={this.props.rdxAuthState}
                    onChange={this.props.rdxAuth}
                    authForm={this.props.rdxAuthFormObj}
                    submit={this.props.sendAuthForm}
                    signIn={this.props.rdxSignIn}
                    signInError={this.props.rdxSignInError}
                    signUp={this.props.rdxSignUp}
                    signUpError={this.props.rdxSignUpError}
                    signUpSuccess={this.props.rdxSignUpSuccess}
                    loggedIn={this.props.loggedIn}
                    formValid={this.props.rdxFormValid}
                    toggleError={this.props.rdxToggleError}
                    toggleProp={this.props.rdxToggleAuthType}
                    tokenExpired={this.props.tokenExpired}
                    toggleMainProp={this.props.toggleMainProp}
                    /// email
                    signUpSuccessEmail={this.signUpSuccessEmail}
                />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        rdxAuthState: state.authentication,
        rdxFormElementsArr: state.authentication.formElementsArr,
        rdxAuthFormObj: state.authentication.authForm,
        rdxAccessKeyValid: state.authentication.accessKeyValid,
        rdxSignUp: state.authentication.signUp,
        rdxFormValid: state.authentication.formValid,
        rdxSignIn: state.authentication.signIn,
        rdxSignInError: state.authentication.signInError,
        rdxSignIn: state.authentication.signIn,
        rdxSignUpError: state.authentication.signUpError,
        rdxSignUpSuccess: state.authentication.signUpSuccess,

    }
}
const mapDispatchToProps = dispatch => {
    return {
        rdxAuth: (e, authFormState)=>dispatch(reduxActions.auth(e, authFormState)),
        rdxCreateFormArr: (authForm)=>dispatch(reduxActions.createFormArr(authForm)),
        rdxToggleAuthType: (e, authForm, prop)=>dispatch(reduxActions.toggleAuthType(e, authForm, prop)),
        rdxGetAccessKeys: (authForm)=>dispatch(reduxActions.getAccessKeys(authForm)),
        rdxSgKey:()=>dispatch(reduxActions.sgAccessKey()),
        sendAuthForm: (e, authState) => dispatch(reduxActions.sendAuthForm(e, authState)),
        rdxToggleError:(e, errorTarget, val)=> dispatch(reduxActions.toggleError(e, errorTarget, val)),
        rdxAuthReset: ()=>dispatch(reduxActions.authReset())
      
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationCon);
