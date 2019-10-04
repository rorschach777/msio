
import * as actionTypes from './actionTypes';
import axiosFBInstance from '../../axios/axios';
import axios from 'axios';
import { setUser, logoutTimer } from '../actions/mainActions';
import { checkElementValidity } from '../../validation/validation';
import axiosFB from '../../axios/axios';

export const createFormArr = (authForm) => {
    const formElementsArr = [];
    for (let key in authForm) {
        formElementsArr.push({
            id: key,
            config: authForm[key]
        })
    }
    return {
        type: actionTypes.AUTH_CREATE_FORMARR,
        payload: {
            formElementsArr: formElementsArr
        }
    }
}
export const auth = (e, authState) => {
    return dispatch => {
        dispatch(inputUpdated(e, authState))
    }
}
// GET THE ACCESS KEYS
export const getAccessKeys = () => {
    return dispatch => {
        let formattedAccessKeys = []
        axiosFBInstance.get('/accessKeys.json')
            .then(accessKeys => {
                accessKeys.data.forEach((cur, idx) => {
                    formattedAccessKeys.push(cur.toLowerCase())
                })
                return formattedAccessKeys
            })
            .then((keys) => {
                dispatch(setAccessKeys(keys))

            })
            .catch(err => {
                console.log(err);
            }
            )
    }
}
export const sgAccessKey = () => {
    return dispatch => {
        let k
        axiosFB.get('/sgKey.json')
        .then (res=>{
           k = res.data
           dispatch(setSgKey(k))
        }) 
 
    }
      
}
const setSgKey = (k) => {
    return {
        type: actionTypes.AUTH_GET_SGKEY,
        payload: {
            val: k
        }
    }
}
// SET THE ACCESS KEYS
const setAccessKeys = (accessKeys) => {
    return {
        type: actionTypes.AUTH_SET_ACCESSKEYS,
        payload: {
            accessKeys: accessKeys
        }
    }
}
const setInput = (inputId, updatedAuthFormElement) => {
    return {
        type: actionTypes.AUTH_INPUT_UPDATED,
        payload: {
            id: inputId,
            updatedAuthFormElement: updatedAuthFormElement
        }
    }
}
export const toggleAuthType = (e, authForm, prop) => {
    e.preventDefault()

    return dispatch => {
        if (prop === 'signIn') {
            dispatch(signInButtonClick(authForm))
        }
        else if (prop === 'signUp') {
            dispatch(signUpButtonClick(authForm))
        }

    }

}

const updateInputUI = (el, placeholder) => {

    return {
        type: actionTypes.AUTH_RESET_UI
    }
}
const signInButtonClick = (authForm) => {
    return {
        type: actionTypes.AUTH_METHOD_TOGGLE,
        payload: {
            authForm: {
                ...authForm,
                accessKey: {
                    ...authForm.accessKey,
                    isValid: true,
                    touched: true
                },
                firstName: {
                    ...authForm.firstName,
                    isValid: true,
                    touched: true
                },
                lastName: {
                    ...authForm.lastName,
                    isValid: true,
                    touched: true
                },
                companyName: {
                    ...authForm.companyName,
                    isValid: true,
                    touched: true
                },
                ///

                emailAddress: {
                    ...authForm.emailAddress,
                    placeholder: 'Email Address',
                    isValid: true,
                    touched: false,
                    value: null
                },
                password: {
                    ...authForm.password,
                    placeholder: 'Password',
                    isValid: true,
                    touched: false,
                    value: null
                }
            },
            signUpSuccess: false,
            signIn: true,
            signUp: false
        }
    }
}
const signUpButtonClick = (authForm) => {
    return {
        type: actionTypes.AUTH_METHOD_TOGGLE,
        payload: {
            authForm: {
                ...authForm,
                accessKey: {
                    ...authForm.accessKey,
                    isValid: true,
                    touched: false
                }
            },
            signUpSuccess: false,
            signIn: false,
            signUp: true
        }
    }
}
export const sendAuthForm = (e, authState) => {
    return dispatch => {
        axiosFBInstance.get('/accessKeys.json')
            .then(accessKeys => {
                const formattedAccessKeys = []
                accessKeys.data.forEach((cur, idx) => {
                    formattedAccessKeys.push(cur.toLowerCase())
                })
                let userEmailPass = {
                    email: authState.authForm.emailAddress.value,
                    password: authState.authForm.password.value,
                    returnSecureToken: true
                }
                return userEmailPass

            })
            .then(userEmailPass => {
                if (authState.signUp) {
                    dispatch(checkAccessKeys(e, authState, userEmailPass));
                    
                }
                else if (authState.signIn) {
                    dispatch(signIn(e, userEmailPass, authState));
                }

            })
    }
}
const checkAccessKeys = (e, authState, userEmailPass) => {
    return dispatch => {
        let proposedAccessKey = authState.authForm.accessKey.value.toLowerCase()
        let accessKeys = []
        authState.accessKeys.forEach((cur, idx) => {
            accessKeys.push(cur.toLowerCase())
        })
        if (accessKeys.includes(proposedAccessKey)) {
            dispatch(accessKeyValid(true))
            dispatch(signUp(e, userEmailPass, authState));
        }
        else {
            dispatch(accessKeyValid(false));

            dispatch(toggleError(e, 'signUpError', true));
            dispatch(toggleError(e, 'signInError', false));
        }
    }
}
const accessKeyValid = (val) => {
    return {
        type: actionTypes.AUTH_CHECK_ACCESSKEYS,
        payload: {
            bool: val
        }
    }
}
const signUp = (e, userEmailPass, authState) => {
    return dispatch => {
        let proposedAccessKey = authState.authForm.accessKey.value
        let urlModifier
        let loginId = proposedAccessKey.split('_')
        loginId = loginId.pop().toString();
        urlModifier = 'signUp'
        axiosFB.get('/fbKey.json')
            .then((keyStr) => {
                let key = keyStr.data
                return key
            })
            .then((key) => {
                axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${urlModifier}?key=${key}`, userEmailPass)
                    // get the user id
                    .then(response => {
                        let userId = response.data.localId
                        return userId;

                    })
                    // pass this along into the user object
                    .then(uId => {

                        let user = {
                            accessKey: authState.authForm.accessKey.value,
                            companyName: authState.authForm.companyName.value,
                            firstName: authState.authForm.firstName.value,
                            lastName: authState.authForm.lastName.value,
                            userId: uId
                        }
                        return user
                    })
                    // post the user object into table
                    .then(userInfo => {
                        // User Sucessful sign up - display message. 
                      
                        axiosFBInstance.post('users.json', userInfo)
                        dispatch(signUpSuccess(true))
             
                       
                 
                    })

                    //// PROBLEM BLOCK: 
                    // .then(()=>{
                    //      // Set the logged in state to true // bypass signing in. 
                    //     dispatch(signUpSuccess(true))
                    //     toggleAuthType(e, authState.authForm, 'signIn')
                    //     signIn(e, userEmailPass)
                 
                    //     console.log('SIGN IN FROM SIGN UP')
                    // })
                    //ERROR
                    .catch(err => {
                        dispatch(signUpError())
                    })

            }
            )
    }
}
export const signUpError = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_ERROR

    }
}
export const toggleError = (e, errorTarget, val) => {
    e.preventDefault();
    return {
        type: actionTypes.AUTH_TOGGLE_ERROR,
        payload: {
            error: errorTarget,
            bool: val
        }
    }
}
const signUpSuccess = (val) => {
    return {
        type: actionTypes.AUTH_SIGNUP_SUCCESS,
        payload: {
            bool: val
        }
    }
}
const signIn = (e, userEmailPass) => {
    return dispatch => {
        let urlModifier = 'signInWithPassword'
        axiosFB.get('/fbKey.json')
            .then((keyStr) => {
                let key = keyStr.data
                return key
            })
            .then((key) => {
                axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${urlModifier}?key=${key}`, userEmailPass)
                    .then(response => {
                        let globals = {
                            localId: response.data.localId,
                            token: response.data.idToken,
                            tokenExp: response.data.expiresIn
                        }
                        dispatch(accessKeyValid(true))
                        dispatch(setUser(globals));

                    })
                    .catch(err => {
                        dispatch(toggleError(e, 'signUpError', false));
                        dispatch(toggleError(e, 'signInError', true));
                    })
            })
    }
}
export const authReset = () => {
    return {
        type: actionTypes.AUTH_SIGNIN_RESET
    }
}

const inputUpdated = (e, authState) => {
    return dispatch => {
        e.preventDefault();
        let authForm = {
            ...authState.authForm
        }
        let inputId = e.target.id
        let value = e.target.value
        let isValid = checkElementValidity(value, authState.authForm[inputId].validation)
        let errorVisible = !isValid
        let touched = true
        let updatedAuthFormElement = {
            ...authForm[inputId],
            value: value,
            isValid: isValid,
            inputConfig: {
                ...authForm[inputId].inputConfig,
                errorVisible: errorVisible
            },
            touched: touched
        }

        let updatedAuthForm = {
            ...authForm,
            [inputId]: {
                ...updatedAuthFormElement
            }
        }
        dispatch(setInput(inputId, updatedAuthFormElement));
        dispatch(checkTotalValidity(updatedAuthForm));
    }


}
// CHECK TO SEE IF UPDATED FORM IS VALID
export const checkTotalValidity = (updatedForm) => {
    let authForm = {
        ...updatedForm
    }
    let validSettings = []
    // Put all the input setting boolean values in an array
    for (let key in authForm) {
        validSettings.push(authForm[key].touched, authForm[key].isValid)
    }
    // If the valid settings does not contain false, the form is valid  // data can be submitted. 
    return dispatch => {
        if (!validSettings.includes(false)) {
            dispatch(setTotalValidity(true))
        }
        // otherwise...
        else {
            dispatch(setTotalValidity(false))
        }
    }

}
// IF VALID SET BOOL VAL
const setTotalValidity = (val) => {
    return {
        type: actionTypes.AUTH_TOTAL_VALIDITY,
        payload: {
            bool: val
        }
    }
}
