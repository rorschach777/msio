import React, { Component } from 'react';
import './_Main.scss';


import {Switch, Route} from 'react-router-dom'
import Header from '../../components/UI/Header/Header';

import Aux from '../../components/Hoc/Aux/Aux';
import axiosFBInstance from '../../axios/axios';
// REDUX
import {connect} from 'react-redux'
import * as reduxActions from '../../store/actions/index';

// CONTAINERS 
import SkillsCon from '../../containers/SkillsCon/SkillsCon';
import ResumeCon from '../../containers/ResumeCon/ResumeCon';
import AuthenticationCon from '../../containers/AuthenticationCon/AuthenticationCon';
import ContactCon from '../../containers/ContactCon/ContactCon';


// COMPONENTS 
import Login from '../../components/Login/Login';
import LoginPanel from '../../components/Login/LoginPanel/LoginPanel';
import IntroFull from '../../components/IntroFull/IntroFull';
import IntroName from '../../components/IntroName/IntroName';
import Portfolio from '../../components/Portfolio/Portfolio';
import PageNotFound from '../../components/Error/PageNotFound/PageNotFound';
import {withRouter} from 'react-router-dom';
import CoverLetterCon from '../CoverLetterCon/CoverLetterCon';
class Main extends Component {
    state = {
        headerCollapsed: false, 
        windowHeight: 0, 
        //
        loggedIn: false,
        loginError: false,
        loginId: null, 
        tokenExpired: false,
        // 
        userInfo: {
            token: null, 
            tokenExp: null,
            userId: null,
            firstName: null,
            lastName: null,
            company: null,
            accessKey: null
        }
    }

    toggleHeader=()=>{
        this.setState(prevState=>({
            headerCollapsed: !prevState.headerCollapsed,
            solidBackground: !prevState.solidBackground
        }))
    }
    showError=()=>{
        this.setState(prevState=>({
            loginError: !prevState.loginError
        }))
    }

    setBkg = () => {
        let el = document.getElementById('main-container')
        el.style.animationName = this.props.background
    }
    toggleSomething=(el)=>{
        this.setState(prevState=>({
            [el]: !prevState.test
        }))
    }
    setUser = (globals) => {
        // go out to the users table, 
        axiosFBInstance.get('/users.json')
        .then(users=> {
            let obj = users.data
            return obj
        })
        // cycle over the array, until match found of Id, 
        .then(usersObj=>{
            let userObj = null
            for (let key in usersObj){
                if (usersObj[key].userId === globals.localId){
                    userObj = {
                        token: globals.token, 
                        tokenExp: globals.tokenExp,
                        userId:globals.localId,
                        firstName: usersObj[key].firstName,
                        lastName: usersObj[key].lastName,
                        company: usersObj[key].companyName, 
                        accessKey: usersObj[key].accessKey,
                    } 
                }
            }
            return userObj
        })
        .then(updatedUserObj=>{
            this.setState(prevState=>({
                loggedIn: true,
                userInfo: {
                    ...updatedUserObj
                }
            }), this.logoutTimer(updatedUserObj.tokenExp))
        })
        // create an object, and replace it in the state. 
    }
    logoutTimer = (duration) => {
        setTimeout(()=>{
            this.setState({
                loggedIn: false,
                tokenExpired: true

            }, this.showState)
        }, duration)
    }
    toggleMainProp = (e, property) =>{
        e.preventDefault();
        this.setState(prevState=>({
            [property]: !prevState[property]
        }))
    }
    componentDidMount(){
        this.props.loggedInCheck()
        this.props.backgroundTransition('bkgHideSolid');
        window.addEventListener('resize', ()=>{
           this.setState(prevState=>({
               windowHeight: window.innerHeight
           }))
        })
    }
    render() {
        // HEADER
        const header = 
        <Header 
        headerCollapsed={this.state.headerCollapsed}
        logout={this.props.logout}
        toggleHeader={this.toggleHeader}
        />
        let login = () => {
            return (
                <LoginPanel>
                <AuthenticationCon 
                toggleBackground={this.toggleBkg}
                toggleMainProp={this.toggleMainProp}
                loggedIn={this.props.loggedIn}
                userFirstName={this.props.userInfo.firstName}
                tokenExpired={this.props.tokenExpired}
                setUser={this.setUser}
                />
                </LoginPanel>
            )
        }
        let mainContent = ()=>{
                return (
                    <Aux>
                        <Route exact path="/" render={()=><IntroFull firstName={this.props.userInfo.firstName}/>}/>
                        <Route exact path='/resume' render={()=><ResumeCon show={this.props.loggedIn}/>}/>
                        <Route exact path='/login' render={()=><Login loggedIn={this.props.loggedIn} login={this.login}/>}/>
                        <Route exact path='/cover-letter' render={()=><CoverLetterCon loginId={this.props.loginId} userInfo={this.props.userInfo}/>} />
                        <Route exact path='/skills' render={()=><SkillsCon show={this.props.test} click={this.toggleTest}/>}/>
                        <Route exact path='/portfolio' render={()=><Portfolio/>}/>
                        <Route exact path='/contact' render={()=><ContactCon toggleBkg={this.toggleBkg}/>}/>
                    </Aux>
                )
        }
        let defaultContent = () => {
            return (
                <Aux>
                    <Switch>
                        <Route exact path="/" render={()=><IntroName/>}/>
                        <Route path='/login' exact render={()=>login()} />
                        <Route render={()=><PageNotFound/>}/>
                    </Switch>
                </Aux>
            ) 
        }
        return (
            <div className="App">
                {this.props.loggedIn ? header : null}
                <div className="Main" id="main-container">
                   {this.props.loggedIn ?  mainContent() : defaultContent()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        background: state.main.background,
        loggedIn: state.main.loggedIn,
        loginError: state.main.loginError,
        loginId: state.main.loginId,
        userInfo: state.main.userInfo,
        authIntro: state.main.authIntro
    }
}
const mapDispatchToProps = dispatch => {
    return {
        reduxTest : (e)=>dispatch(reduxActions.mainTest(e, 'hi from main')),
        backgroundTransition: (bkgState)=>dispatch(reduxActions.backgroundTransition(bkgState)),
        logout: (e)=>dispatch(reduxActions.logout(e)),
        loggedInCheck: (curUserObj)=>dispatch(reduxActions.loggedInCheck(curUserObj)),
        aToggle: (e)=>dispatch(reduxActions.authIntroToggle(e))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));