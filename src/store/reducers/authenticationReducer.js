import * as actionTypes from '../actions/actionTypes';

const initialState = {
    accessKeys: [],
    accessKeyValid: false,

    authForm: {
        firstName: {
            placeholder: 'First Name',
            order: 1,
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--half',
                errorMessage: 'Please enter your first name',
                errorVisible: false,
                label: null,
                signInVisible: false, 
                signUpVisible: true,
            },
            validation: {
                required: true,
                minLength: 1,
                maxLength: 15
            },
            isValid: true,
            touched: false,
            value: ''
        },
        lastName: {
            placeholder: 'Last Name',
            order: 2,
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--half',
                errorMessage: 'Please enter your last name',
                errorVisible: false, 
                label: null,
                signInVisible: false, 
                signUpVisible: true,
            },
            validation: {
                required: true,
                minLength: 1,
                maxLength: 15
            },
            isValid: true,
            touched: false,
            value: ''
        },
        emailAddress: {
            placeholder: 'Email Address',
            order: 3,
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--full',
                errorMessage: 'Please enter a valid email address', 
                errorVisible: false,
                label: null,
                signInVisible: true, 
                signUpVisible: true,
            },
            validation: {
                required: true,
                email: true,

            },
            isValid: true,
            touched: false,
            value: ''
        },
        password: {
            placeholder: 'Password',
            order: 4,
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--full',
                errorMessage: 'Must include 1 lower, 1 upper, 1 numeral, and 1 special character',
                errorVisible: false, 
                label: null,
                signInVisible: true, 
                signUpVisible: true,
            },
            validation: {
                required: true,
                password: true,
            },
            isValid: true,
            touched: false,
            value: ''
        },
        companyName: {
            placeholder: 'Company Name',
            order: 5, 
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--half', 
                errorMessage: 'Sorry, this is an invalid length',
                errorVisible: false,
                label: null,
                signInVisible: false, 
                signUpVisible: true,
            },
            validation: {
                required: true,
                minLength: 1,
                maxLength: 20
            },
            isValid: true,
            touched: false,
            value: ''
        },
        accessKey: {
            placeholder: 'Access Key',
            order: 6, 
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--half', 
                errorMessage: 'Sorry, this is an invalid length',
                errorVisible: false,
                label: null,
                signInVisible: false, 
                signUpVisible: true,
            },
            validation: {
                required: true,
                maxLength: 25,
                minLength: 2
            },
            isValid: true,
            touched: false,
            value: ''
        }
    },
    // Authentication Method
    signIn: false,
    signUp: true,
    // Authentication Status
    signUpSuccess: false, 
    signUpError: false,
    signInError: false,
    formValid: false, 
    userEmailPass: {
        email: null,
        password: null,
        returnSecureToken: null
    }
    
}
const authenticationReducer = (state = initialState, action) => {
    switch(action.type){
        // GET ACCESS KEY
        case actionTypes.AUTH_GET_ACCESSKEYS:
        return{
            ...state, 
            accessKeys: action.payload.accessKeys
        }
        // SET ACCESS KEY
        case actionTypes.AUTH_SET_ACCESSKEYS:
            return {
            ...state, 
            accessKeys: [...action.payload.accessKeys]
        }
        // CHECK ACCESS KEY
        case actionTypes.AUTH_CHECK_ACCESSKEYS:
            return {
            ...state, 
            accessKeyValid: action.payload.bool
        }
        // INPUT UPDATED
        case actionTypes.AUTH_INPUT_UPDATED:
       
            return{
                ...state,
                authForm: {
                  ...action.payload.authForm
                }
         }
        // TOTAL VALIDITY
        case actionTypes.AUTH_TOTAL_VALIDITY:
            return{
                ...state,
                formValid: action.payload.bool
            }
        // SIGNUP
        case actionTypes.AUTH_SIGNUP:
        return {
            ...state
        }
        // SIGNUP SUCCESS
        case actionTypes.AUTH_SIGNUP_SUCCESS:
            return {
        ...state,
        signUpSuccess: action.payload.bool
        }
        // SIGNUP ERROR
        case actionTypes.AUTH_SIGNUP_ERROR:
            return {
                ...state,
                signUpError: true
            }
        // AUTH METHOD TOGGLE
        case actionTypes.AUTH_METHOD_TOGGLE:
        return {
            ...state, 
            authForm: {
                ...action.payload.authForm
            },
            signIn: action.payload.signIn,
            signUp: action.payload.signUp

        }
        // SIGNIN RESET
        case actionTypes.AUTH_SIGNIN_RESET:
            return {
                ...state,
                authForm: {
                    ...state.authForm,
                    emailAddress: {
                        ...state.authForm.emailAddress,
                        value: ''
                    },
                    password: {
                        ...state.authForm.password,
                        value: ''
                    }
                }
            }
         // AUTH TOGGLE ERROR
         case actionTypes.AUTH_TOGGLE_ERROR:
            return {
            ...state,
            [action.payload.error]: action.payload.bool
        }
        // RETURN CURRENT STATE
        case actionTypes.AUTH_RESET_UI:
            return {
                ...state
            }
        default: 
            return state
    }
   
}
export default authenticationReducer