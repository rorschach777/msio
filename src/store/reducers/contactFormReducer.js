import * as actionTypes from '../actions/actionTypes';
const initialState = {
    form: {
        firstName: {
            placeholder: 'First Name',
            inputConfig: {
                type: 'input', 
                fieldLayoutClass: 'input-layout input-layout--half',
                errorMessage: 'Please enter your first name',
                errorVisible: false,
                label: null,
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
            inputConfig: {
                type: 'input', 
                fieldLayoutClass: 'input-layout input-layout--half',
                errorMessage: 'Please enter your last name',
                errorVisible: false, 
                label: null,
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
            placeholder: 'Best Email Address',
            inputConfig: {
                type: 'input', 
                fieldLayoutClass: 'input-layout input-layout--half',
                errorMessage: 'Please enter a valid email address', 
                errorVisible: false,
                label: null,
            },
            validation: {
                required: true,
                email: true,

            },
            isValid: true,
            touched: false,
            value: null
        },
        phoneNumber: {
            placeholder: 'Phone Number',
            inputConfig: {
                type: 'input', 
                fieldLayoutClass: 'input-layout input-layout--half',
                errorMessage: 'Please enter a valid phone number - use the following format: 999-999-9999', 
                errorVisible: false,
                label: null,
            },
            validation: {
                required: true,
                minLength: 10,
                maxLength: 12,

            },
            isValid: true,
            touched: false,
            value: null
        },
        subjectLine: {
            placeholder: 'Subject Line',
            inputConfig: {
                type: 'input', 
                fieldLayoutClass: 'input-layout input-layout--full',
                errorMessage: 'Sorry, This subject line is too long',
                errorVisible: false, 
                label: null,
            },
            validation: {
                required: true,
                minLength: 1,
                maxLength: 25
            },
            isValid: true,
            touched: false,
            value: null
        },
        message: {
            placeholder: 'Your Message',
            inputConfig: {
                type: 'text-area', 
                fieldLayoutClass: 'input-layout input-layout--half', 
                errorMessage: 'Sorry, message length can\'t exceed 250 characters.',
                errorVisible: false,
                label: null,
            },
            validation: {
                required: true,
                notHTML: true,
                maxLength: 250
       
            },
            isValid: true,
            touched: false,
            value: null
        }
    },
    formValid: false,
    formSubmitted: false
}
const contactFormReducer = (state = initialState, action) => {
    switch(action.type){
        //
        case actionTypes.CONTACT_INIT:
        return {
            ...state
        }
        //
        case actionTypes.CONTACT_INPUT_UPDATED:
        return {
            ...state,
            form: {
                ...state.form,
                [action.payload.id] : {
                    ...action.payload.values
                }
            }
        }
        //
        case actionTypes.CONTACT_TOTAL_VALIDITY:
        return{
            ...state,
            formValid: action.payload.bool
        }
        // 
        case actionTypes.CONTACT_FORM_SUBMITTED: 
        return{
            ...state,
            formSubmitted: true
        }
        //
        case actionTypes.CONTACT_RESET:
            return {
                ...state,
                formSubmitted: false
            }
        default: 
        return {
            ...state
        }
    }

}
export default contactFormReducer;