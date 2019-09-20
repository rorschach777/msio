import * as actionTypes from '../actions/actionTypes'
const initialState = {
        headerCollapsed: false, 
        windowHeight: 0, 
        authIntro: true,
        //
        loggedIn: false,
        loginError: false,
        // 
        tokenExpired: false,
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
const mainReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.MAIN_SET_USER: 
        return {
            ...state,
            loggedIn: action.payload.loggedIn,
            userInfo: {
                ...action.payload.userInfo
            }
        }
        //
        case actionTypes.MAIN_TOGGLE_BACKGROUND:
        return {
            ...state
        }
        //
        case actionTypes.MAIN_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.payload.bool
            }
        //
        case actionTypes.MAIN_LOGOUT:
            return {
                ...state,
                background: action.payload.background,
                loggedIn: action.payload.loggedIn,
                tokenExpired: action.payload.tokenExpired
        }
        //
        case actionTypes.MAIN_TOGGLE_AUTHINTRO: 
        return {
            ...state,
            authIntro: false
        }
        default: 
        return {
            ...state
        }
    }
    return state
}
export default mainReducer