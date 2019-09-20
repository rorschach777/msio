import React, { Component } from 'react';
import Authentication from '../../components/Login/Authentication/Authentication';
import * as reduxActions from '../../store/actions/index';

import {connect} from 'react-redux'
class AuthenticationCon extends Component {
    clearError=(e,target)=>{
        e.preventDefault();
        let property = `${target}Error`
        this.setState(prevState=>({
            [property]: false
        }), this.showState)
    }
    componentDidMount(){
        this.props.rdxGetAccessKeys()
    }
  
    // componentWillUnmount(){
    //     this.props.rdxAuthReset()
    // }
    render() {
    
        return (
            <div>
                <Authentication
                    //TODO: CLEAN THIS UP
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
                />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        rdxAuthState: state.authentication,
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
        rdxToggleAuthType: (e, authForm, prop)=>dispatch(reduxActions.toggleAuthType(e, authForm, prop)),
        rdxGetAccessKeys: (authForm)=>dispatch(reduxActions.getAccessKeys(authForm)),
        sendAuthForm: (e, authState) => dispatch(reduxActions.sendAuthForm(e, authState)),
        rdxToggleError:(e, errorTarget, val)=> dispatch(reduxActions.toggleError(e, errorTarget, val)),
        rdxAuthReset: ()=>dispatch(reduxActions.authReset())
      
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationCon);