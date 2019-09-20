import * as actionTypes from './actionTypes';
import axiosFBInstance from '../../axios/axios';

export const mainTest = () => {
    return {
        type: actionTypes.TEST
    }
}
export const setUser = (globals) => {
    return dispatch => {
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
        .then ((userObj)=>{
            // Get the current time, add 1 hour the expiration time * 1000 (miliseconds to seconds) 
            const expirationDate = new Date((new Date().getTime()) + (userObj.tokenExp * 1000))
            localStorage.setItem('token', userObj.token)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', userObj.userId)


            dispatch(backgroundTransition('bkgShowSolid'))
            dispatch(setUserData(userObj));
            dispatch(loggedIn(true));
            // dispatch(toggleBackground('bkgShowSolid'))
        }) 
        .then(()=>{
            dispatch(logoutTimer(globals))
        })
        .catch((err)=>{
            // dispatch(loginError(true))
        })
    }
}
export const backgroundTransition = (val) => {
    // should be bkgShowSolid or bkgHideSolid
    let el = document.getElementById('main-container')
    el.style.animationName = val;
    return {
        type: actionTypes.MAIN_TOGGLE_BACKGROUND
    }
}
const setUserData=(userObj)=>{
    return {
        type: actionTypes.MAIN_SET_USER,
        payload: {
            userInfo: {
                ...userObj
            }
        }
    }
}
const logoutTimer = (globals) => {
    return dispatch =>  {
        setTimeout(()=>{
                dispatch(logout());
                dispatch(backgroundTransition('bkgHideSolid'));
        }, globals.tokenExp * 1000)
    }
}
const loggedIn = (val) => {
    return {
        type: actionTypes.MAIN_LOGGED_IN,
        payload: {
            bool: val
        }
    }
}
const loginError = (val) => {
    return {
        type: actionTypes.MAIN_LOGIN_ERROR,
        palyload: {
            bool: val
        }
    }
}
export const loggedInCheck = () => {

    return dispatch => {
        let token = localStorage.getItem('token');
   
        if (!token){
 
            dispatch(logout())
        }
        else if (token){
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate <= new Date()){
            
                dispatch(logout());
            }
            else {
               let localId = localStorage.getItem('userId')
               let remainingSeconds = (expirationDate.getTime() -  new Date().getTime() ) / 1000
           

               let userObj = {
                localId: localId,
                token: token,
                tokenExp: remainingSeconds
               }
               dispatch(setUser(userObj))
  
               let globals = {
                   tokenExp: remainingSeconds
               }
               // timer object
               dispatch(logoutTimer(globals))
            }
        }
    }
}
export const authIntroToggle = (e) => {
    e.preventDefault();
    return {
        type: actionTypes.MAIN_TOGGLE_AUTHINTRO
    }
}
export const logout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return dispatch => {
        dispatch(backgroundTransition('bkgHideSolid'))
        dispatch(setLogout())
    }
}
const setLogout = ()=>{
    return {
        type: actionTypes.MAIN_LOGOUT,
            payload: {
            loggedIn: false,
            tokenExpired: true
        }
    }
} 
export const toggleBackground = (opacityLevel) => {
    let el = document.getElementById('main-container')
    el.style.animationName = this.props.background
    return dispatch => {
        dispatch(setBkgState(opacityLevel));
    }
}
const setBkgState  = (opacityLevel) => {
    return {
        type: actionTypes.MAIN_TOGGLE_BACKGROUND,
        payload: {
            background: opacityLevel
        }
    }
}
