import * as actionTypes from '../actions/actionTypes';

const initialState = {
    accessKeys: [],
    sgKey: null,
    accessKeyValid: false,
    formElementsArr: [],
    authForm: {
        firstName: {
            placeholder: 'First Name',
            order: 0,
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--half',
                errorMessage: 'Please enter your first name',
                errorVisible: false,
                label: null,
                signInVisible: false, 
                signUpVisible: true,
                passwordReset: false,
                passwordConfirmation: false
            },
            validation: {
                required: true,
                minLength: 1,
                maxLength: 15
            },
            isValid: true,
            touched: false,
            value: null
        },
        lastName: {
            placeholder: 'Last Name',
            order: 1,
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--half',
                errorMessage: 'Please enter your last name',
                errorVisible: false, 
                label: null,
                signInVisible: false, 
                signUpVisible: true,
                passwordReset: false,
                passwordConfirmation: false
            },
            validation: {
                required: true,
                minLength: 1,
                maxLength: 15
            },
            isValid: true,
            touched: false,
            value: null
        },
        emailAddress: {
            placeholder: 'Email Address',
            order: 2,
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--full',
                errorMessage: 'Please enter a valid email address', 
                errorVisible: false,
                label: null,
                signInVisible: true, 
                signUpVisible: true,
                passwordReset: true,
                passwordConfirmation: false
            },
            validation: {
                required: true,
                email: true,
            },
            isValid: true,
            touched: false,
            value: null
        },
        password: {
            placeholder: 'Password',
            order: 3,
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--full',
                errorMessage: 'Must include 1 lower, 1 upper, 1 numeral, and 1 special character',
                errorVisible: false, 
                label: null,
                signInVisible: true, 
                signUpVisible: true,
                passwordReset: false,
                passwordConfirmation: false
            },
            validation: {
                required: true,
                password: true,
            },
            isValid: true,
            touched: false,
            value: null
        },
        companyName: {
            placeholder: 'Company Name',
            order: 4, 
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--half', 
                errorMessage: 'Sorry, this is an invalid length',
                errorVisible: false,
                label: null,
                signInVisible: false, 
                signUpVisible: true,
                passwordReset: false,
                passwordConfirmation: false
            },
            validation: {
                required: true,
                minLength: 1,
                maxLength: 20
            },
            isValid: true,
            touched: false,
            value: null
        },
        accessKey: {
            placeholder: 'Access Key',
            order: 5, 
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--half', 
                errorMessage: 'Sorry, this is an invalid length',
                errorVisible: false,
                label: null,
                signInVisible: false, 
                signUpVisible: true,
                passwordReset: false,
                passwordConfirmation: false
            },
            validation: {
                required: true,
                minLength: 2,
                maxLength: 20,
            },
            isValid: true,
            touched: false,
            value: null
        },
        newPassword: {
            placeholder: 'New Password',
            order: 6,
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--full',
                errorMessage: 'Must include 1 lower, 1 upper, 1 numeral, and 1 special character',
                errorVisible: false, 
                label: null,
                signInVisible: false, 
                signUpVisible: false,
                passwordReset: false,
                passwordConfirmation: true
            },
            validation: {
                required: true,
                password: true,
            },
            isValid: true,
            touched: false,
            value: null
        },
        confirmPassword: {
            placeholder: 'Confirm Password',
            order: 7,
            inputConfig: {
                type: 'text', 
                fieldLayoutClass: 'input-layout input-layout--full',
                errorMessage: 'Your passwords are not valid, or do not match',
                errorVisible: false, 
                label: null,
                signInVisible: false, 
                signUpVisible: false,
                passwordReset: false,
                passwordConfirmation: true
            },
            validation: {
                required: true,
                passwordConfirm: true,
            },
            isValid: true,
            touched: false,
            value: null
        },
    },
    // Authentication Method
    signIn: false,
    signUp: true,
    resetPassword: false,
    resetPasswordConfirmation: false,
    resetPasswordMessageShow: false,
    resetPasswordEmailSent: false, 
    resetPasswordUser: {
        emailExists: false,
        emailAddress: '',
        userId: '',
    },
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
        case actionTypes.AUTH_CREATE_FORMARR:
         return{
            ...state,
            formElementsArr: [...action.payload.formElementsArr]
        }
        //
        case actionTypes.AUTH_GET_SGKEY:
        return {
            ...state,
            sgKey: action.payload.val
        }
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
                  ...state.authForm,
                  [action.payload.id]: {
                      ...state.authForm[action.payload.id],
                      ...action.payload.updatedAuthFormElement
                  }
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
            signUpSuccess: action.payload.signUpSuccess,
            signIn: action.payload.signIn,
            signUp: action.payload.signUp, 
            resetPassword: false,

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
        case actionTypes.AUTH_RESET_PASSWORD:
            return{
                ...state,
                signIn: false, 
                signUp: false,
                resetPassword: true
            }
        case actionTypes.AUTH_SET_RESET_PASSWORD_MESSAGE:
            return{
                ...state,
                resetPasswordEmailSent: action.payload.resetPasswordEmailSent,
                resetPasswordMessageShow: action.payload.showResetMessage
            }
  
        case actionTypes.AUTH_SET_RESET_PASSWORD_USER:
            return {
                ...state,
                resetPasswordUser: {
                    ...action.payload.user
                }
            }
        default: 
            return state
    }
   
}
export default authenticationReducer